use anchor_lang::prelude::*;
use crate::state::{CustomerAccount, IdentityProvider, VerificationLevel};

/// Verify customer identity using Civic Pass
/// 
/// NOTE: For MVP/Hackathon, this is a placeholder that sets identity_verified = true
/// For production, this will verify the Civic Pass gateway token on-chain
#[derive(Accounts)]
pub struct VerifyIdentity<'info> {
    #[account(mut)]
    pub customer: Signer<'info>,
    
    /// Civic Pass gateway token account (optional for MVP)
    /// CHECK: In production, this will be validated against Civic Pass program
    /// For MVP, this can be any account or None
    pub civic_gateway_token: Option<AccountInfo<'info>>,
    
    #[account(
        init_if_needed,
        payer = customer,
        space = CustomerAccount::LEN,
        seeds = [b"customer", customer.key().as_ref()],
        bump
    )]
    pub customer_account: Account<'info, CustomerAccount>,
    
    pub system_program: Program<'info, System>,
}

pub fn verify_identity(
    ctx: Context<VerifyIdentity>,
    provider: IdentityProvider,
    level: VerificationLevel,
) -> Result<()> {
    let customer_account = &mut ctx.accounts.customer_account;
    let clock = Clock::get()?;
    
    // Initialize if this is a new account
    if customer_account.owner == Pubkey::default() {
        customer_account.owner = ctx.accounts.customer.key();
        customer_account.total_loans = 0;
        customer_account.loans_repaid = 0;
        customer_account.loans_defaulted = 0;
        customer_account.available_credit = 0;
        customer_account.bump = ctx.bumps.customer_account;
    }
    
    // ============================================
    // MVP MODE: Skip actual verification
    // ============================================
    #[cfg(feature = "mvp")]
    {
        msg!("MVP MODE: Skipping Civic Pass verification");
        customer_account.identity_verified = true;
        customer_account.identity_provider = provider;
        customer_account.verification_level = level.clone();
        customer_account.verified_at = clock.unix_timestamp;
        customer_account.civic_gateway_token = ctx.accounts.civic_gateway_token
            .as_ref()
            .map(|acc| acc.key());
    }
    
    // ============================================
    // PRODUCTION MODE: Verify Civic Pass
    // ============================================
    #[cfg(not(feature = "mvp"))]
    {
        match provider {
            IdentityProvider::CivicPass => {
                verify_civic_pass(
                    &ctx.accounts.civic_gateway_token,
                    &ctx.accounts.customer.key(),
                    &level,
                )?;
                
                customer_account.identity_verified = true;
                customer_account.identity_provider = provider;
                customer_account.verification_level = level.clone();
                customer_account.verified_at = clock.unix_timestamp;
                customer_account.civic_gateway_token = ctx.accounts.civic_gateway_token
                    .as_ref()
                    .map(|acc| acc.key());
            }
            _ => {
                return Err(ErrorCode::UnsupportedIdentityProvider.into());
            }
        }
    }
    
    // Update credit limit based on verification level
    customer_account.available_credit = customer_account.calculate_credit_limit();
    
    msg!(
        "Identity verified: provider={:?}, level={:?}, credit_limit={}",
        customer_account.identity_provider,
        customer_account.verification_level,
        customer_account.available_credit
    );
    
    Ok(())
}

/// Verify Civic Pass gateway token (production only)
#[cfg(not(feature = "mvp"))]
fn verify_civic_pass(
    civic_gateway_token: &Option<AccountInfo>,
    customer: &Pubkey,
    expected_level: &VerificationLevel,
) -> Result<()> {
    let gateway_token = civic_gateway_token
        .as_ref()
        .ok_or(ErrorCode::NoCivicPass)?;
    
    // TODO: Add actual Civic Pass verification when civic-gateway crate is available
    // This is a placeholder for the production implementation
    //
    // 1. Verify gateway token is owned by Civic program
    // require!(
    //     gateway_token.owner == &civic_gateway::ID,
    //     ErrorCode::InvalidCivicPassOwner
    // );
    //
    // 2. Deserialize gateway token
    // let token_data = civic_gateway::GatewayToken::try_from_slice(
    //     &gateway_token.data.borrow()
    // )?;
    //
    // 3. Verify token is for this customer
    // require!(
    //     token_data.owner == *customer,
    //     ErrorCode::CivicPassOwnerMismatch
    // );
    //
    // 4. Verify token is not expired
    // let current_time = Clock::get()?.unix_timestamp;
    // require!(
    //     token_data.expire_time > current_time,
    //     ErrorCode::CivicPassExpired
    // );
    //
    // 5. Verify token is active
    // require!(
    //     token_data.state == civic_gateway::State::Active,
    //     ErrorCode::CivicPassNotActive
    // );
    //
    // 6. Verify gateway type matches expected level
    // match (token_data.gateway_type, expected_level) {
    //     (civic_gateway::GatewayType::Captcha, VerificationLevel::Captcha) => Ok(()),
    //     (civic_gateway::GatewayType::UniquenessSMS, VerificationLevel::UniquenessSMS) => Ok(()),
    //     (civic_gateway::GatewayType::KYC, VerificationLevel::KYC) => Ok(()),
    //     _ => Err(ErrorCode::VerificationLevelMismatch.into()),
    // }
    
    msg!("PLACEHOLDER: Civic Pass verification not yet implemented");
    msg!("Customer: {}", customer);
    msg!("Expected level: {:?}", expected_level);
    
    Ok(())
}

#[error_code]
pub enum ErrorCode {
    #[msg("No valid Civic Pass found")]
    NoCivicPass,
    
    #[msg("Civic Pass is expired")]
    CivicPassExpired,
    
    #[msg("Civic Pass is not active")]
    CivicPassNotActive,
    
    #[msg("Civic Pass owner mismatch")]
    CivicPassOwnerMismatch,
    
    #[msg("Invalid Civic Pass owner")]
    InvalidCivicPassOwner,
    
    #[msg("Verification level mismatch")]
    VerificationLevelMismatch,
    
    #[msg("Unsupported identity provider")]
    UnsupportedIdentityProvider,
}

