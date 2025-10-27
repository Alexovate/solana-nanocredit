use anchor_lang::prelude::*;
use crate::state::*;

pub fn request_loan(
    ctx: Context<RequestLoan>,
    amount: u64,
    rssi: i8,
    timestamp: i64,
    nonce: [u8; 32],
    customer_signature: [u8; 64],
    merchant_signature: [u8; 64],
) -> Result<()> {
    let loan = &mut ctx.accounts.loan;
    let proximity_proof = &mut ctx.accounts.proximity_proof;
    
    // Initialize proximity proof
    proximity_proof.merchant = ctx.accounts.merchant.key();
    proximity_proof.customer = ctx.accounts.customer.key();
    proximity_proof.rssi = rssi;
    proximity_proof.timestamp = timestamp;
    proximity_proof.nonce = nonce;
    proximity_proof.customer_signature = customer_signature;
    proximity_proof.merchant_signature = merchant_signature;
    proximity_proof.verified = false; // Will be verified in next step
    
    // Validate loan amount (min $0.25, max $25 in lamports)
    require!(
        amount >= 250_000 && amount <= 25_000_000,
        ErrorCode::InvalidLoanAmount
    );
    
    // Initialize loan
    loan.borrower = ctx.accounts.customer.key();
    loan.merchant = ctx.accounts.merchant.key();
    loan.amount = amount;
    loan.status = LoanStatus::Pending;
    loan.created_at = Clock::get()?.unix_timestamp;
    loan.proximity_proof = proximity_proof.key();
    loan.bump = ctx.bumps.loan;
    
    msg!("Loan request created: {} lamports", amount);
    msg!("RSSI: {}dBm, Timestamp: {}", rssi, timestamp);
    
    Ok(())
}

#[derive(Accounts)]
pub struct RequestLoan<'info> {
    #[account(
        init,
        payer = customer,
        space = ProximityProof::LEN,
    )]
    pub proximity_proof: Account<'info, ProximityProof>,
    
    #[account(
        init,
        payer = customer,
        space = LoanAccount::LEN,
        seeds = [
            b"loan",
            customer.key().as_ref(),
            merchant.key().as_ref(),
        ],
        bump
    )]
    pub loan: Account<'info, LoanAccount>,
    
    #[account(mut)]
    pub customer: Signer<'info>,
    
    /// CHECK: Merchant pubkey is validated in proximity proof
    pub merchant: UncheckedAccount<'info>,
    
    pub system_program: Program<'info, System>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Loan amount must be between $0.25 and $25")]
    InvalidLoanAmount,
}

