import { Connection, PublicKey, Transaction, SystemProgram, Keypair } from '@solana/web3.js'

const PROGRAM_ID = new PublicKey('Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS')
const RPC_ENDPOINT = 'http://localhost:8899'

export type ProximityProof = {
  merchant: string
  customer: string
  rssi: number
  timestamp: number
  nonce: Uint8Array
  customerSignature: Uint8Array
  merchantSignature: Uint8Array
}

export async function submitLoanRequest(
  customerKeypair: Keypair,
  proof: ProximityProof,
  loanAmount: number
): Promise<string> {
  const connection = new Connection(RPC_ENDPOINT, 'confirmed')
  
  // Generate PDA for loan account
  const [loanPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('loan'),
      new PublicKey(proof.customer).toBuffer(),
      new PublicKey(proof.merchant).toBuffer(),
    ],
    PROGRAM_ID
  )
  
  // Generate keypair for proximity proof account
  const proximityProofKeypair = Keypair.generate()
  
  // Build transaction (simplified for demo)
  const transaction = new Transaction()
  
  // In production, this would call the actual program instruction
  // For now, we'll just simulate success
  console.log('Transaction built:')
  console.log('- Loan PDA:', loanPDA.toString())
  console.log('- Proximity Proof:', proximityProofKeypair.publicKey.toString())
  console.log('- Amount:', loanAmount)
  
  // Simulate transaction hash
  const txHash = `demo_${Date.now()}_${Math.random().toString(36).substring(7)}`
  
  return txHash
}

export async function getConnectionStatus(): Promise<boolean> {
  try {
    const connection = new Connection(RPC_ENDPOINT, 'confirmed')
    const version = await connection.getVersion()
    console.log('Connected to Solana:', version)
    return true
  } catch (error) {
    console.error('Failed to connect to Solana:', error)
    return false
  }
}

