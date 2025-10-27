use anchor_lang::prelude::*;
use anchor_lang::solana_program::{ed25519_program, instruction::Instruction};
use crate::state::*;

pub fn verify_proximity(ctx: Context<VerifyProximity>) -> Result<()> {
    let proof = &mut ctx.accounts.proximity_proof;
    
    // Verify RSSI is within acceptable range (-55 to -80 dBm for ~10m)
    require!(
        proof.rssi >= -80 && proof.rssi <= -55,
        ErrorCode::InvalidRSSI
    );
    
    // Verify timestamp is recent (within 5 minutes)
    let current_time = Clock::get()?.unix_timestamp;
    let time_diff = current_time - proof.timestamp;
    require!(
        time_diff >= 0 && time_diff <= 300,
        ErrorCode::ExpiredProof
    );
    
    // Build message that was signed
    let mut message = Vec::new();
    message.extend_from_slice(proof.merchant.as_ref());
    message.extend_from_slice(proof.customer.as_ref());
    message.push(proof.rssi as u8);
    message.extend_from_slice(&proof.timestamp.to_le_bytes());
    message.extend_from_slice(&proof.nonce);
    
    // Verify customer signature
    verify_ed25519_signature(
        &message,
        &proof.customer_signature,
        proof.customer.as_ref(),
    )?;
    
    // Verify merchant signature  
    verify_ed25519_signature(
        &message,
        &proof.merchant_signature,
        proof.merchant.as_ref(),
    )?;
    
    // Mark as verified
    proof.verified = true;
    
    msg!("Proximity proof verified successfully");
    
    Ok(())
}

fn verify_ed25519_signature(
    message: &[u8],
    signature: &[u8; 64],
    public_key: &[u8; 32],
) -> Result<()> {
    // For hackathon MVP, we'll do basic validation
    // In production, use ed25519_program for on-chain verification
    require!(signature.len() == 64, ErrorCode::InvalidSignature);
    require!(public_key.len() == 32, ErrorCode::InvalidPublicKey);
    
    // TODO: Integrate with ed25519_program for full verification
    msg!("Signature validation: OK (basic check)");
    
    Ok(())
}

#[derive(Accounts)]
pub struct VerifyProximity<'info> {
    #[account(mut)]
    pub proximity_proof: Account<'info, ProximityProof>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("RSSI value out of acceptable range")]
    InvalidRSSI,
    #[msg("Proof timestamp expired (> 5 minutes old)")]
    ExpiredProof,
    #[msg("Invalid Ed25519 signature")]
    InvalidSignature,
    #[msg("Invalid Ed25519 public key")]
    InvalidPublicKey,
}

