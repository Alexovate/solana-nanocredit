use anchor_lang::prelude::*;

/// Identity verification provider
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, Debug)]
pub enum IdentityProvider {
    None,              // MVP: No verification required
    CivicPass,         // Production: Civic Pass verification
    HumanityProtocol,  // Future: Humanity Protocol palm scan
    WorldID,           // Future: World ID cross-chain
}

impl Default for IdentityProvider {
    fn default() -> Self {
        IdentityProvider::None
    }
}

/// Verification level determines credit limit
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, Debug)]
pub enum VerificationLevel {
    None,           // No verification - $2 credit limit
    Captcha,        // CAPTCHA only - $5 credit limit  
    UniquenessSMS,  // Phone verification - $10 credit limit
    KYC,            // Full KYC - $25 credit limit
}

impl Default for VerificationLevel {
    fn default() -> Self {
        VerificationLevel::None
    }
}

impl VerificationLevel {
    /// Get base credit limit in micro-USDC (6 decimals)
    pub fn base_credit_limit(&self) -> u64 {
        match self {
            VerificationLevel::None => 2_000_000,        // $2
            VerificationLevel::Captcha => 5_000_000,     // $5
            VerificationLevel::UniquenessSMS => 10_000_000, // $10
            VerificationLevel::KYC => 25_000_000,        // $25
        }
    }
}

/// Credit level based on repayment history
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, Debug)]
pub enum CreditLevel {
    Starter,  // New user
    Bronze,   // 1+ successful repayments
    Silver,   // 3+ successful repayments, >90% rate
    Gold,     // 5+ successful repayments, >95% rate
}

impl Default for CreditLevel {
    fn default() -> Self {
        CreditLevel::Starter
    }
}

/// Customer account tracking credit history and identity verification
#[account]
pub struct CustomerAccount {
    /// Owner wallet address
    pub owner: Pubkey,
    
    /// Loan statistics
    pub total_loans: u64,
    pub loans_repaid: u64,
    pub loans_defaulted: u64,
    
    /// Current available credit in micro-USDC
    pub available_credit: u64,
    
    /// Credit level based on history
    pub credit_level: CreditLevel,
    
    // ============================================
    // Identity Verification (Civic Pass Integration)
    // ============================================
    
    /// Whether identity has been verified
    pub identity_verified: bool,
    
    /// Which identity provider was used
    pub identity_provider: IdentityProvider,
    
    /// Civic Pass gateway token account (optional)
    /// This is the on-chain attestation from Civic
    pub civic_gateway_token: Option<Pubkey>,
    
    /// Verification level achieved
    pub verification_level: VerificationLevel,
    
    /// Timestamp of verification
    pub verified_at: i64,
    
    /// PDA bump
    pub bump: u8,
}

impl CustomerAccount {
    pub const LEN: usize = 8 +      // discriminator
        32 +                         // owner
        8 +                          // total_loans
        8 +                          // loans_repaid
        8 +                          // loans_defaulted
        8 +                          // available_credit
        1 +                          // credit_level enum
        1 +                          // identity_verified bool
        1 +                          // identity_provider enum
        (1 + 32) +                   // civic_gateway_token Option<Pubkey>
        1 +                          // verification_level enum
        8 +                          // verified_at
        1;                           // bump

    /// Calculate credit limit based on verification level and repayment history
    pub fn calculate_credit_limit(&self) -> u64 {
        // Base limit from verification level
        let base_limit = self.verification_level.base_credit_limit();
        
        // No adjustment for new users
        if self.total_loans == 0 {
            return base_limit;
        }
        
        // Calculate repayment rate
        let repayment_rate = self.loans_repaid as f64 / self.total_loans as f64;
        
        // Adjust based on repayment history
        if repayment_rate < 0.80 {
            base_limit / 2  // 50% reduction for poor history
        } else if repayment_rate < 0.90 {
            base_limit * 3 / 4  // 25% reduction for mediocre history
        } else {
            base_limit  // Full limit for good history
        }
    }
    
    /// Update credit level based on repayment history
    pub fn update_credit_level(&mut self) {
        if self.total_loans == 0 {
            self.credit_level = CreditLevel::Starter;
            return;
        }
        
        let repayment_rate = self.loans_repaid as f64 / self.total_loans as f64;
        
        self.credit_level = if self.loans_repaid >= 5 && repayment_rate >= 0.95 {
            CreditLevel::Gold
        } else if self.loans_repaid >= 3 && repayment_rate >= 0.90 {
            CreditLevel::Silver
        } else if self.loans_repaid >= 1 {
            CreditLevel::Bronze
        } else {
            CreditLevel::Starter
        };
    }
    
    /// Check if customer can request a loan of given amount
    pub fn can_request_loan(&self, amount: u64) -> bool {
        amount <= self.available_credit
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_verification_level_credit_limits() {
        assert_eq!(VerificationLevel::None.base_credit_limit(), 2_000_000);
        assert_eq!(VerificationLevel::Captcha.base_credit_limit(), 5_000_000);
        assert_eq!(VerificationLevel::UniquenessSMS.base_credit_limit(), 10_000_000);
        assert_eq!(VerificationLevel::KYC.base_credit_limit(), 25_000_000);
    }
    
    #[test]
    fn test_credit_limit_calculation() {
        let mut account = CustomerAccount {
            owner: Pubkey::default(),
            total_loans: 0,
            loans_repaid: 0,
            loans_defaulted: 0,
            available_credit: 0,
            credit_level: CreditLevel::Starter,
            identity_verified: false,
            identity_provider: IdentityProvider::None,
            civic_gateway_token: None,
            verification_level: VerificationLevel::None,
            verified_at: 0,
            bump: 0,
        };
        
        // New user gets full base limit
        assert_eq!(account.calculate_credit_limit(), 2_000_000);
        
        // Good repayment history (90%+) keeps full limit
        account.total_loans = 10;
        account.loans_repaid = 9;
        assert_eq!(account.calculate_credit_limit(), 2_000_000);
        
        // Mediocre history (80-90%) gets 75% of limit
        account.loans_repaid = 8;
        assert_eq!(account.calculate_credit_limit(), 1_500_000);
        
        // Poor history (<80%) gets 50% of limit
        account.loans_repaid = 7;
        assert_eq!(account.calculate_credit_limit(), 1_000_000);
    }
    
    #[test]
    fn test_credit_level_progression() {
        let mut account = CustomerAccount {
            owner: Pubkey::default(),
            total_loans: 0,
            loans_repaid: 0,
            loans_defaulted: 0,
            available_credit: 0,
            credit_level: CreditLevel::Starter,
            identity_verified: false,
            identity_provider: IdentityProvider::None,
            civic_gateway_token: None,
            verification_level: VerificationLevel::None,
            verified_at: 0,
            bump: 0,
        };
        
        // New user is Starter
        account.update_credit_level();
        assert_eq!(account.credit_level, CreditLevel::Starter);
        
        // 1 repayment = Bronze
        account.total_loans = 1;
        account.loans_repaid = 1;
        account.update_credit_level();
        assert_eq!(account.credit_level, CreditLevel::Bronze);
        
        // 3 repayments with 90%+ rate = Silver
        account.total_loans = 3;
        account.loans_repaid = 3;
        account.update_credit_level();
        assert_eq!(account.credit_level, CreditLevel::Silver);
        
        // 5 repayments with 95%+ rate = Gold
        account.total_loans = 5;
        account.loans_repaid = 5;
        account.update_credit_level();
        assert_eq!(account.credit_level, CreditLevel::Gold);
    }
}

