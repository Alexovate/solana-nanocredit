use anchor_lang::prelude::*;

#[account]
pub struct ProximityProof {
    pub merchant: Pubkey,
    pub customer: Pubkey,
    pub rssi: i8,
    pub timestamp: i64,
    pub nonce: [u8; 32],
    pub customer_signature: [u8; 64],
    pub merchant_signature: [u8; 64],
    pub verified: bool,
}

impl ProximityProof {
    pub const LEN: usize = 8 + // discriminator
        32 + // merchant
        32 + // customer
        1 +  // rssi
        8 +  // timestamp
        32 + // nonce
        64 + // customer_signature
        64 + // merchant_signature
        1;   // verified
}

