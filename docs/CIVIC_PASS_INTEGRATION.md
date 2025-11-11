# Civic Pass Integration Guide

## Overview

This document outlines the integration plan for Civic Pass identity verification in the NanoCredit Solana program.

## Why Civic Pass?

Based on competitive research (see `research/Research blockchain nano-lending projects competin.md`):

- ✅ **Live on Solana** - 2M+ verifications processed
- ✅ **Multiple verification levels** - CAPTCHA to full KYC
- ✅ **Works in target markets** - Philippines, Indonesia, Kenya
- ✅ **Cost-effective** - $0.50-2.00 per verification
- ✅ **Non-transferable attestation** - Prevents account sharing
- ✅ **Well-documented** - Mature integration guides

## Integration Timeline

### Phase 1: Hackathon/MVP (Current)
- Simple wallet-based identity
- No Civic Pass requirement
- Focus on proximity verification + merchant-centric model

### Phase 2: Production (Q1 2025)
- Integrate Civic Pass verification
- Start with CAPTCHA level (cheap, fast)
- Upgrade to KYC for higher credit limits

### Phase 3: Scale (Q2 2025)
- Add Humanity Protocol as alternative
- Multi-provider support via Solana Attestation Service

## Technical Architecture

### Account Structure

```rust
#[account]
pub struct CustomerAccount {
    pub owner: Pubkey,
    pub total_loans: u64,
    pub loans_repaid: u64,
    pub loans_defaulted: u64,
    pub available_credit: u64,
    pub credit_level: CreditLevel,
    
    // Identity verification fields
    pub identity_verified: bool,
    pub identity_provider: IdentityProvider,
    pub civic_gateway_token: Option<Pubkey>,  // Civic Pass token account
    pub verification_level: VerificationLevel,
    pub verified_at: i64,
    
    pub bump: u8,
}
```

### Verification Levels

```rust
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum VerificationLevel {
    None,           // No verification - $2 credit limit
    Captcha,        // CAPTCHA only - $5 credit limit
    UniquenessSMS,  // Phone verification - $10 credit limit
    KYC,            // Full KYC - $25 credit limit
}
```

### Integration Flow

```
1. Customer opens mini-app
   ↓
2. App checks if Civic Pass exists
   ↓
3. If no pass → Redirect to Civic Pass flow
   ↓
4. Customer completes verification (CAPTCHA/KYC)
   ↓
5. Civic issues gateway token (on-chain)
   ↓
6. Customer returns to NanoCredit app
   ↓
7. request_loan() checks Civic gateway token
   ↓
8. If valid → Loan approved with appropriate credit limit
```

## Smart Contract Integration

### Dependencies

Add to `programs/nanocredit/Cargo.toml`:

```toml
[dependencies]
anchor-lang = "0.30.0"
anchor-spl = "0.30.0"
# Civic Pass integration (when ready for production)
# civic-gateway = { version = "0.1.0", features = ["cpi"] }
```

### Account Validation

```rust
#[derive(Accounts)]
pub struct RequestLoan<'info> {
    #[account(mut)]
    pub customer: Signer<'info>,
    
    #[account(mut)]
    pub merchant: SystemAccount<'info>,
    
    // Civic Pass gateway token (optional for MVP, required for production)
    /// CHECK: Civic Pass gateway token account
    #[account(
        constraint = civic_gateway_token.key() == customer_account.civic_gateway_token.unwrap_or(Pubkey::default())
        @ ErrorCode::InvalidCivicPass
    )]
    pub civic_gateway_token: Option<AccountInfo<'info>>,
    
    #[account(
        init_if_needed,
        payer = customer,
        space = CustomerAccount::LEN,
        seeds = [b"customer", customer.key().as_ref()],
        bump
    )]
    pub customer_account: Account<'info, CustomerAccount>,
    
    // ... other accounts
}
```

### Verification Logic

```rust
pub fn verify_civic_pass(
    civic_gateway_token: &AccountInfo,
    customer: &Pubkey,
) -> Result<VerificationLevel> {
    // For MVP: Skip verification
    #[cfg(feature = "mvp")]
    return Ok(VerificationLevel::None);
    
    // For production: Verify Civic Pass
    #[cfg(not(feature = "mvp"))]
    {
        // 1. Verify gateway token is owned by Civic program
        require!(
            civic_gateway_token.owner == &civic_gateway::ID,
            ErrorCode::InvalidCivicPassOwner
        );
        
        // 2. Deserialize gateway token
        let gateway_token = civic_gateway::GatewayToken::try_from_slice(
            &civic_gateway_token.data.borrow()
        )?;
        
        // 3. Verify token is for this customer
        require!(
            gateway_token.owner == *customer,
            ErrorCode::CivicPassOwnerMismatch
        );
        
        // 4. Verify token is not expired
        let current_time = Clock::get()?.unix_timestamp;
        require!(
            gateway_token.expire_time > current_time,
            ErrorCode::CivicPassExpired
        );
        
        // 5. Verify token is active
        require!(
            gateway_token.state == civic_gateway::State::Active,
            ErrorCode::CivicPassNotActive
        );
        
        // 6. Return verification level based on gateway type
        match gateway_token.gateway_type {
            civic_gateway::GatewayType::Captcha => Ok(VerificationLevel::Captcha),
            civic_gateway::GatewayType::UniquenessSMS => Ok(VerificationLevel::UniquenessSMS),
            civic_gateway::GatewayType::KYC => Ok(VerificationLevel::KYC),
            _ => Ok(VerificationLevel::None),
        }
    }
}
```

### Credit Limit Calculation

```rust
pub fn calculate_credit_limit(
    verification_level: VerificationLevel,
    repayment_history: &CustomerAccount,
) -> u64 {
    // Base credit limit by verification level
    let base_limit = match verification_level {
        VerificationLevel::None => 2_000_000,      // $2 USDC
        VerificationLevel::Captcha => 5_000_000,   // $5 USDC
        VerificationLevel::UniquenessSMS => 10_000_000, // $10 USDC
        VerificationLevel::KYC => 25_000_000,      // $25 USDC
    };
    
    // Adjust based on repayment history
    let repayment_rate = if repayment_history.total_loans > 0 {
        repayment_history.loans_repaid as f64 / repayment_history.total_loans as f64
    } else {
        1.0 // New users get full base limit
    };
    
    // Reduce limit if poor repayment history
    if repayment_rate < 0.80 {
        base_limit / 2 // 50% reduction for <80% repayment
    } else if repayment_rate < 0.90 {
        base_limit * 3 / 4 // 25% reduction for <90% repayment
    } else {
        base_limit // Full limit for >=90% repayment
    }
}
```

## Frontend Integration

### Mini-App Flow

```typescript
// src/lib/civic.ts

import { CivicPass, GatewayProvider } from '@civic/solana-gateway-react';

export const CIVIC_GATEKEEPER_NETWORK = {
  // Use different networks for different verification levels
  CAPTCHA: new PublicKey('ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6'),
  UNIQUENESS: new PublicKey('uniqobk8oGh4XBLMqM68K8M2zNu3CdYX7q5go7whQiv'),
  KYC: new PublicKey('tgnuXXNMDLK8dy7Xm1TdeGyc95MDym4bvAQCwcW21Bf'),
};

export function CivicPassButton({ 
  level = 'CAPTCHA',
  onVerified 
}: {
  level: 'CAPTCHA' | 'UNIQUENESS' | 'KYC',
  onVerified: () => void
}) {
  return (
    <GatewayProvider
      gatekeeperNetwork={CIVIC_GATEKEEPER_NETWORK[level]}
      wallet={wallet}
      cluster="mainnet-beta"
    >
      <CivicPass
        onVerified={onVerified}
        onError={(error) => console.error('Civic Pass error:', error)}
      />
    </GatewayProvider>
  );
}
```

### User Experience

```typescript
// Customer page flow
export default function CustomerPage() {
  const [civicPassStatus, setCivicPassStatus] = useState<'none' | 'pending' | 'verified'>('none');
  const [verificationLevel, setVerificationLevel] = useState<VerificationLevel>('None');
  
  // Check if user has Civic Pass
  useEffect(() => {
    checkCivicPass(wallet.publicKey).then(status => {
      setCivicPassStatus(status.verified ? 'verified' : 'none');
      setVerificationLevel(status.level);
    });
  }, [wallet.publicKey]);
  
  if (civicPassStatus === 'none') {
    return (
      <div>
        <h2>Verify Your Identity</h2>
        <p>Choose your verification level to unlock higher credit limits:</p>
        
        <div className="verification-options">
          <VerificationOption
            level="CAPTCHA"
            creditLimit="$5"
            time="30 seconds"
            cost="Free"
          />
          <VerificationOption
            level="UNIQUENESS"
            creditLimit="$10"
            time="2 minutes"
            cost="$0.50"
          />
          <VerificationOption
            level="KYC"
            creditLimit="$25"
            time="5 minutes"
            cost="$2.00"
          />
        </div>
      </div>
    );
  }
  
  // Rest of customer loan request flow...
}
```

## Cost Analysis

| Verification Level | Civic Pass Cost | Credit Limit | Cost per $1 Credit |
|-------------------|----------------|--------------|-------------------|
| CAPTCHA           | Free           | $5           | $0.00             |
| Uniqueness (SMS)  | $0.50          | $10          | $0.05             |
| KYC               | $2.00          | $25          | $0.08             |

**Comparison to Competitors:**
- Divine Research: 40% default rate, 20-30% interest to compensate
- NanoCredit: <10% default rate (World Chain data), lower interest possible
- **ROI**: Civic Pass cost is worth it to reduce defaults

## Migration Plan

### Step 1: Add Feature Flag (Now)
```toml
# Cargo.toml
[features]
default = ["mvp"]
mvp = []  # Skip Civic Pass verification
production = []  # Require Civic Pass verification
```

### Step 2: Update Smart Contract (Q1 2025)
- Add Civic Pass account validation
- Implement verification level logic
- Update credit limit calculations
- Deploy to Devnet for testing

### Step 3: Frontend Integration (Q1 2025)
- Add Civic Pass SDK
- Create verification flow UI
- Test on Devnet
- User acceptance testing

### Step 4: Mainnet Launch (Q2 2025)
- Security audit
- Deploy to Mainnet
- Gradual rollout (start with CAPTCHA only)
- Monitor metrics

## Testing Strategy

### Devnet Testing
1. Create test Civic Pass gateway tokens
2. Test all verification levels
3. Test expired/invalid passes
4. Test credit limit calculations

### Mainnet Testing
1. Internal team testing (5-10 people)
2. Beta testing with merchants (3 stores)
3. Limited public launch (50 users)
4. Full launch

## Error Handling

```rust
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
    
    #[msg("Verification level too low for requested amount")]
    InsufficientVerificationLevel,
}
```

## Monitoring & Analytics

Track these metrics:
- Verification completion rate by level
- Time to complete verification
- Credit limit utilization by verification level
- Default rates by verification level
- Cost per verification vs. default savings

## Resources

- **Civic Docs**: https://docs.civic.com/
- **Civic Pass Integration**: https://docs.civic.com/integration-guides/civic-pass
- **Solana Gateway React**: https://github.com/civicteam/civic-pass-react
- **Gatekeeper Networks**: https://docs.civic.com/integration-guides/civic-pass/available-networks

## Next Steps

1. ✅ Document integration plan (this file)
2. ⏳ Add identity state structures to smart contract
3. ⏳ Implement feature flags for MVP vs Production
4. ⏳ Create frontend verification flow mockups
5. ⏳ Test on Devnet with Civic team
6. ⏳ Production deployment Q1 2025

