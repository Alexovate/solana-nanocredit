# 🏗️ NanoCredit Architecture

## System Overview

```
┌─────────────────────┐
│   Mobile Devices    │
│  (Merchant/Customer)│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   BLE Layer         │
│  (Production: BLE)  │
│  (Demo: WebSocket)  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Proximity Proof   │
│  (Ed25519 Sigs)     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Solana Program     │
│  (Anchor/Rust)      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Loan Accounts      │
│  (PDAs on-chain)    │
└─────────────────────┘
```

## Components

### 1. Frontend (Next.js)

- **Location:** `/app/src/app/`
- **Purpose:** Web-based demo interface
- **Tech:** Next.js 14, TypeScript, TailwindCSS

**Pages:**

- `/` - Landing page with navigation
- `/merchant` - Merchant broadcasting dashboard
- `/customer` - Customer scanning interface

### 2. BLE Simulation (WebSockets)

- **Location:** `/app/src/lib/socket.ts`
- **Purpose:** Simulate BLE for hackathon demo
- **Tech:** Socket.io

**Events:**

- `merchant:broadcast` - Merchant broadcasts presence
- `merchant:detected` - Customer receives broadcast
- `customer:request-signature` - Request merchant signature
- `merchant:signature-response` - Merchant signs proof

### 3. Solana Program (Anchor)

- **Location:** `/programs/nanocredit/src/`
- **Purpose:** On-chain loan management
- **Tech:** Anchor framework, Rust

**Instructions:**

- `request_loan` - Create loan with proximity proof
- `verify_proximity` - Validate signatures and RSSI
- `approve_loan` - Merchant approves loan

**Accounts:**

- `ProximityProof` - Stores BLE proof data
- `LoanAccount` - Stores loan state and metadata

### 4. Tests

- **Location:** `/tests/nanocredit.ts`
- **Purpose:** Integration tests
- **Tech:** Anchor test framework, Mocha

## Data Flow

### Loan Request Flow

```
1. Merchant generates keypair
   │
   ▼
2. Merchant broadcasts via BLE/WebSocket
   │  (pubkey, nonce, timestamp)
   ▼
3. Customer scans and detects
   │  (receives pubkey, mock RSSI)
   ▼
4. Customer builds message
   │  (merchant_pk | customer_pk | rssi | timestamp | nonce)
   ▼
5. Customer signs with Ed25519
   │  (creates customer_signature)
   ▼
6. [DEMO: Mock merchant signature]
   │  [PRODUCTION: Request merchant signature via BLE]
   ▼
7. Submit to Solana
   │  - Create ProximityProof account
   │  - Create LoanAccount PDA
   │  - Verify signatures
   │  - Validate RSSI range
   │  - Check timestamp freshness
   ▼
8. Loan created on-chain
```

## Account Structures

### ProximityProof

```rust
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
```

### LoanAccount

```rust
pub struct LoanAccount {
    pub borrower: Pubkey,
    pub merchant: Pubkey,
    pub amount: u64,
    pub status: LoanStatus,
    pub created_at: i64,
    pub proximity_proof: Pubkey,
    pub bump: u8,
}
```

## Security Model

### 1. Dual Signatures

Both merchant and customer must sign the same message:

- Prevents customer from fabricating proximity
- Prevents merchant from creating fake loans
- Creates tamper-proof audit trail

### 2. RSSI Validation

On-chain validation ensures distance is reasonable:

- Valid range: -55 to -80 dBm (~1-10 meters)
- Too close: Suspicious (device collision)
- Too far: Not truly "at merchant"

### 3. Timestamp Freshness

Prevents replay attacks:

- Max age: 5 minutes
- Requires recent co-location
- Cannot reuse old proofs

### 4. PDA Derivation

Loan accounts use Program Derived Addresses:

- Seeds: `["loan", customer_pubkey, merchant_pubkey]`
- Prevents duplicate loans
- Deterministic addressing

## Production vs Demo

| Feature          | Demo (Hackathon)   | Production                  |
| ---------------- | ------------------ | --------------------------- |
| **BLE**          | WebSockets         | React Native BLE            |
| **Network**      | Local validator    | Solana Mainnet              |
| **RSSI**         | Mock (-65 dBm)     | Real RSSI values            |
| **Merchant Sig** | Mock (client-side) | Real (from merchant device) |
| **Platform**     | Web browser        | Mobile apps (iOS/Android)   |
| **Distance**     | Simulated          | Calculated from RSSI        |

## Scaling Considerations

### Transaction Costs

- Loan creation: ~0.001 SOL (~$0.0001)
- 1M loans/month: $100 in fees
- Compare to: Ethereum ($5-50 per tx)

### Throughput

- Solana: 65k TPS
- NanoCredit needs: ~100 TPS peak
- Ample headroom for scale

### Data Storage

- Each loan: ~256 bytes
- 1M loans: 256 MB on-chain
- Rent: ~0.002 SOL per account

## Future Enhancements

### Phase 2 (Post-Hackathon) - Q4 2025

1. Real BLE implementation (React Native)
2. Mobile apps for iOS/Android
3. USDC integration (SPL Token)
4. Credit scoring algorithms
5. Automated repayment systems

### Phase 3 (Production) - Q1 2026+

1. **Civic Pass integration** for multi-market KYC (see [CIVIC_PASS_INTEGRATION.md](CIVIC_PASS_INTEGRATION.md))
2. Staked merchants with slashing mechanisms
3. Fraud detection ML models
4. Multi-currency support (local stablecoins)
5. Cross-chain bridges (Wormhole)

### Phase 4 (Global Expansion) - 2026

**Active market research and partnership development across 4 regions:**

- 🇵🇭 **Philippines**: GCash integration, sari-sari store networks (Peddlr, Growsari)
- 🇰🇪 **Kenya**: Safaricom M-Pesa partnership, FSD Africa development support
- 🇧🇷 **Brazil**: Pix payment integration, favela community focus
- 🇦🇷 **Argentina**: Worldcoin Orb network leverage, crypto-native market

**See [MARKET_EXPANSION.md](../MARKET_EXPANSION.md) for detailed strategy**

## References

- [Solana Docs](https://docs.solana.com/)
- [Anchor Framework](https://www.anchor-lang.com/)
- [BLE Distance Estimation](https://en.wikipedia.org/wiki/Received_signal_strength_indication)
- [Ed25519 Signatures](https://ed25519.cr.yp.to/)
