use anchor_lang::prelude::*;

pub mod state;
pub mod instructions;

pub use state::*;
pub use instructions::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod nanocredit {
    use super::*;

    pub fn request_loan(
        ctx: Context<RequestLoan>,
        amount: u64,
        rssi: i8,
        timestamp: i64,
        nonce: [u8; 32],
        customer_signature: [u8; 64],
        merchant_signature: [u8; 64],
    ) -> Result<()> {
        instructions::request_loan::request_loan(
            ctx,
            amount,
            rssi,
            timestamp,
            nonce,
            customer_signature,
            merchant_signature,
        )
    }
    
    pub fn verify_proximity(ctx: Context<VerifyProximity>) -> Result<()> {
        instructions::verify_proximity::verify_proximity(ctx)
    }
    
    pub fn approve_loan(ctx: Context<ApproveLoan>) -> Result<()> {
        instructions::approve_loan::approve_loan(ctx)
    }
}

