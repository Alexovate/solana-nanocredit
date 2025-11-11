# Civic Pass Integration Roadmap

## 🎯 Overview

This document tracks the integration of Civic Pass identity verification into the NanoCredit Solana program.

**Decision Date**: January 2025  
**Target Production Date**: Q1 2025  
**Status**: ✅ Architecture Complete, ⏳ Implementation Pending

---

## 📋 Why Civic Pass?

Based on competitive research, Civic Pass is the best choice for production identity verification:

| Criteria | Civic Pass | Humanity Protocol | World ID |
|----------|-----------|-------------------|----------|
| **Status** | ✅ Live (2M+ verifications) | ⏳ Testnet (mainnet Q1 2025) | ✅ Live (Sept 2024) |
| **Technology** | Email/Phone/KYC | Palm scan | Iris scan |
| **Cost** | $0.50-2.00 | ~$0.50 (estimated) | Unknown |
| **Philippines** | ✅ Works | ✅ Works | ❌ Banned |
| **Indonesia** | ✅ Works | ✅ Works | ⚠️ Limited |
| **Integration** | ✅ Well-documented | ⏳ Docs pending | ⚠️ Via Wormhole |
| **Risk** | ✅ Low | ⚠️ Medium (not live) | ⚠️ Medium (regulatory) |

**Decision**: Start with Civic Pass for production, add Humanity Protocol as alternative in Q2 2025.

---

## 🏗️ Implementation Status

### ✅ Phase 1: Architecture (Complete)

- [x] Create `CustomerAccount` state structure with identity fields
- [x] Add `IdentityProvider` enum (None, CivicPass, HumanityProtocol, WorldID)
- [x] Add `VerificationLevel` enum (None, Captcha, UniquenessSMS, KYC)
- [x] Implement credit limit calculation based on verification level
- [x] Add `verify_identity` instruction with feature flags
- [x] Add MVP feature flag to skip verification for hackathon
- [x] Document integration plan in `docs/CIVIC_PASS_INTEGRATION.md`

**Files Created/Modified**:
- `programs/nanocredit/src/state/customer.rs` - Customer account with identity fields
- `programs/nanocredit/src/instructions/verify_identity.rs` - Identity verification instruction
- `programs/nanocredit/Cargo.toml` - Added `mvp` feature flag
- `docs/CIVIC_PASS_INTEGRATION.md` - Comprehensive integration guide

### ⏳ Phase 2: MVP Testing (Hackathon)

- [ ] Build program with `mvp` feature (identity verification disabled)
- [ ] Deploy to Devnet
- [ ] Test `verify_identity` instruction (should succeed without Civic Pass)
- [ ] Test credit limit progression
- [ ] Demo end-to-end flow without identity requirement

**Timeline**: Now - February 2025

### ⏳ Phase 3: Civic Pass Integration (Production)

- [ ] Add `civic-gateway` dependency to Cargo.toml
- [ ] Implement actual Civic Pass verification in `verify_identity.rs`
- [ ] Test on Devnet with Civic Pass testnet
- [ ] Add frontend Civic Pass SDK integration
- [ ] Create verification UI flow
- [ ] Internal testing with team

**Timeline**: February - March 2025

### ⏳ Phase 4: Mainnet Launch

- [ ] Security audit of identity verification logic
- [ ] Deploy to Mainnet without `mvp` feature
- [ ] Beta test with 3 merchants
- [ ] Monitor verification success rates
- [ ] Gradual rollout to all users

**Timeline**: March - April 2025

---

## 💻 How to Use (Current State)

### For Hackathon/MVP (Now)

Build with MVP feature (default):
```bash
# Build with identity verification disabled
anchor build

# Or explicitly:
anchor build --features mvp
```

The program will accept any identity verification without checking Civic Pass.

### For Production (Q1 2025)

Build without MVP feature:
```bash
# Build with identity verification enabled
anchor build --no-default-features
```

The program will require valid Civic Pass gateway tokens.

---

## 📊 Credit Limits by Verification Level

| Level | Verification Required | Time | Cost | Credit Limit |
|-------|----------------------|------|------|--------------|
| **None** | Nothing (MVP only) | 0s | Free | $2 |
| **CAPTCHA** | Complete CAPTCHA | 30s | Free | $5 |
| **Uniqueness** | Phone verification | 2min | $0.50 | $10 |
| **KYC** | Full ID verification | 5min | $2.00 | $25 |

**Repayment History Modifier**:
- <80% repayment rate: 50% credit limit reduction
- 80-90% repayment rate: 25% credit limit reduction  
- >90% repayment rate: Full credit limit

---

## 🔧 Technical Details

### State Structure

```rust
#[account]
pub struct CustomerAccount {
    pub owner: Pubkey,
    pub total_loans: u64,
    pub loans_repaid: u64,
    pub loans_defaulted: u64,
    pub available_credit: u64,
    pub credit_level: CreditLevel,
    
    // Identity fields (Civic Pass)
    pub identity_verified: bool,
    pub identity_provider: IdentityProvider,
    pub civic_gateway_token: Option<Pubkey>,
    pub verification_level: VerificationLevel,
    pub verified_at: i64,
    
    pub bump: u8,
}
```

### Instruction

```rust
pub fn verify_identity(
    ctx: Context<VerifyIdentity>,
    provider: IdentityProvider,
    level: VerificationLevel,
) -> Result<()>
```

### Feature Flags

```toml
[features]
mvp = []  # Skip identity verification
default = ["mvp"]  # MVP mode by default
```

---

## 📚 Resources

- **Integration Guide**: `docs/CIVIC_PASS_INTEGRATION.md`
- **Civic Docs**: https://docs.civic.com/
- **Competitive Research**: `research/Research blockchain nano-lending projects competin.md`
- **Customer State**: `programs/nanocredit/src/state/customer.rs`
- **Verify Identity**: `programs/nanocredit/src/instructions/verify_identity.rs`

---

## 🎯 Next Steps

1. **For Hackathon**: Focus on proximity verification, keep identity simple
2. **Post-Hackathon**: Implement actual Civic Pass verification
3. **Q2 2025**: Add Humanity Protocol as alternative
4. **Q3 2025**: Cross-chain identity (World Chain → Solana)

---

## 📝 Notes

- **Why feature flags?** Allows same codebase for MVP and production
- **Why Civic first?** It's live, proven, and works in our target markets
- **Why add Humanity later?** Palm scan is better UX but not live yet
- **Why not World ID?** Banned in Philippines, our primary market

---

**Last Updated**: January 2025  
**Status**: Ready for hackathon (MVP mode), production implementation pending

