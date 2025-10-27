import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Nanocredit } from "../target/types/nanocredit";
import { PublicKey, Keypair, SystemProgram} from "@solana/web3.js";
import { assert } from "chai";

describe("nanocredit", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Nanocredit as Program<Nanocredit>;
  
  let merchant: Keypair;
  let customer: Keypair;
  let proximityProof: Keypair;

  before(async () => {
    merchant = Keypair.generate();
    customer = Keypair.generate();
    proximityProof = Keypair.generate();
    
    // Airdrop SOL to customer for transaction fees
    const airdropSig = await provider.connection.requestAirdrop(
      customer.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropSig);
  });

  it("Creates a loan request with proximity proof", async () => {
    const amount = new anchor.BN(2000000); // 2 USDC (6 decimals)
    const rssi = -65; // Mock RSSI value (~5 meters)
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = Buffer.from(new Uint8Array(32).fill(1));
    
    // Mock signatures (in real scenario, these would be actual Ed25519 signatures)
    const customerSig = Buffer.from(new Uint8Array(64).fill(2));
    const merchantSig = Buffer.from(new Uint8Array(64).fill(3));
    
    const [loanPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("loan"),
        customer.publicKey.toBuffer(),
        merchant.publicKey.toBuffer(),
      ],
      program.programId
    );

    const tx = await program.methods
      .requestLoan(
        amount,
        rssi,
        new anchor.BN(timestamp),
        Array.from(nonce),
        Array.from(customerSig),
        Array.from(merchantSig)
      )
      .accounts({
        proximityProof: proximityProof.publicKey,
        loan: loanPda,
        customer: customer.publicKey,
        merchant: merchant.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([customer, proximityProof])
      .rpc();

    console.log("Transaction signature:", tx);

    // Fetch and verify the loan account
    const loanAccount = await program.account.loanAccount.fetch(loanPda);
    assert.equal(loanAccount.borrower.toString(), customer.publicKey.toString());
    assert.equal(loanAccount.merchant.toString(), merchant.publicKey.toString());
    assert.equal(loanAccount.amount.toNumber(), amount.toNumber());
    
    console.log("✅ Loan created successfully");
    console.log("Amount:", loanAccount.amount.toNumber());
    console.log("RSSI:", rssi, "dBm");
  });
});

