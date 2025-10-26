use anchor_lang::prelude::*;

pub mod state;
pub use state::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod nanocredit {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("NanoCredit program initialized");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

