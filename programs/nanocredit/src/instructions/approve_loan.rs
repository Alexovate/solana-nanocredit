use anchor_lang::prelude::*;
use crate::state::*;

pub fn approve_loan(ctx: Context<ApproveLoan>) -> Result<()> {
    let loan = &mut ctx.accounts.loan;
    
    // Only pending loans can be approved
    require!(
        loan.status == LoanStatus::Pending,
        ErrorCode::InvalidLoanStatus
    );
    
    // Update status to approved
    loan.status = LoanStatus::Approved;
    
    msg!("Loan approved: {} lamports", loan.amount);
    msg!("Borrower: {}", loan.borrower);
    
    Ok(())
}

#[derive(Accounts)]
pub struct ApproveLoan<'info> {
    #[account(mut)]
    pub loan: Account<'info, LoanAccount>,
    
    /// CHECK: Merchant authority
    pub merchant: Signer<'info>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Loan must be in Pending status to approve")]
    InvalidLoanStatus,
}

