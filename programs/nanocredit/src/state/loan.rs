use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum LoanStatus {
    Pending,
    Approved,
    Repaid,
    Defaulted,
}

#[account]
pub struct LoanAccount {
    pub borrower: Pubkey,
    pub merchant: Pubkey,
    pub amount: u64,
    pub status: LoanStatus,
    pub created_at: i64,
    pub proximity_proof: Pubkey,
    pub bump: u8,
}

impl LoanAccount {
    pub const LEN: usize = 8 + // discriminator
        32 + // borrower
        32 + // merchant  
        8 +  // amount
        1 +  // status enum
        8 +  // created_at
        32 + // proximity_proof
        1;   // bump
}

