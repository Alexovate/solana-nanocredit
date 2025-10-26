# 🏆 NanoCredit: Solana Nano-Loans MVP - BLE Proximity Verification

## Colosseum Cypherpunk Hackathon 2025 - DeFi Track

**Submission Deadline**: October 30, 2025  
**Track**: DeFi - Decentralized Financial Inclusion  
**MVP Goal**: Prove BLE proximity verification works on Solana

---

## 🎯 MVP Scope (Hackathon-Ready)

### What We're Building:

A **local demo** showing BLE proximity verification integrated with Solana smart contract for nano-loans using **web app simulation** for speed and clarity.

### Demo Approach:

- ✅ **Local Solana Validator** - Run blockchain locally (no DevNet deployment needed)
- ✅ **Web App (Not Mobile)** - Two browser tabs simulate merchant/customer
- ✅ **Mock BLE via WebSockets** - Simulate BLE communication between tabs
- ✅ **Real Cryptography** - Actual Ed25519 signatures and proof verification
- ✅ **Real Solana Transactions** - Deploy and interact with actual Anchor program

**Why This Approach:**

- ⚡ Faster development (web vs mobile)
- 🎯 Focus on innovation (proximity proof verification)
- 🔍 Easy to demo (no phone connection issues)
- ✅ Shows the hard part (on-chain verification logic)
- 📱 Production plan clearly documented (react-native-ble-manager)

### Core Features ONLY:

1. ✅ **Mock BLE Proximity Proof** - WebSocket communication simulates BLE between browser tabs
2. ✅ **Real Solana Program** - Verifies proof on-chain and manages loan state
3. ✅ **Web UI (2 Tabs)** - Merchant broadcasts, customer scans and requests
4. ✅ **Local Explorer** - View transactions on local Solana Explorer
5. ✅ **Demo Flow** - Complete end-to-end working prototype

### Explicitly OUT OF SCOPE (Post-Hackathon):

- ❌ Real BLE on mobile devices (documented for production)
- ❌ DevNet/Mainnet deployment (local only for demo)
- ❌ Civic Pass integration (use simple wallet addresses)
- ❌ Progressive credit system (fixed $2 limit)
- ❌ Merchant staking mechanism
- ❌ Repayment tracking (focus on loan request)
- ❌ Credit scoring
- ❌ Multi-user testing
- ❌ Advanced fraud detection

---

## 🏗️ Technical Architecture (Simplified)

### 1. Mock BLE Proximity Verification (Simulated for Demo)

**Goal**: Simulate BLE proximity verification using WebSockets between browser tabs, with real cryptographic signatures.

#### Simplified Flow (Simulated):

```
1. Merchant Tab broadcasts via WebSocket:
   {merchant_pubkey, nonce, timestamp}

2. Customer Tab "scans" via WebSocket subscription:
   - Receives merchant broadcast
   - Generates simulated RSSI: -65 dBm (mock 5 meter distance)
   - RSSI between -55dBm to -80dBm ≈ < 10 meters

3. Customer Tab signs proximity proof (REAL Ed25519):
   message = hash(merchant_pubkey + customer_pubkey + RSSI + timestamp + nonce)
   customer_sig = Sign(customer_key, message)

4. Merchant Tab signs confirmation (REAL Ed25519):
   merchant_sig = Sign(merchant_key, message)

5. Customer Tab submits to LOCAL Solana validator:
   proximity_proof = {
     merchant_pubkey,
     customer_pubkey,
     rssi,              // Simulated but realistic value
     timestamp,
     nonce,
     customer_sig,      // Real Ed25519 signature
     merchant_sig       // Real Ed25519 signature
   }
```

**What's Real vs Mock:**

- ✅ **Real**: Ed25519 signatures, Solana transactions, proof verification logic
- 🔶 **Mock**: BLE communication (WebSocket instead), RSSI values (hardcoded realistic values)
- 📱 **Production**: Would use `react-native-ble-manager` for actual BLE on mobile

#### BLE Parameters (Simplified):

| Parameter           | Value        | Why                          |
| ------------------- | ------------ | ---------------------------- |
| BLE Version         | 4.0+         | 90% phone coverage           |
| Broadcast Interval  | 500ms        | Balance discovery vs battery |
| RSSI Threshold      | ≤ -80 dBm    | ~10 meter max range          |
| Verification Window | ± 10 seconds | Reasonable time buffer       |
| Latency Target      | < 5 seconds  | Acceptable for demo          |

---

### 2. Solana Program (Anchor)

**Goal**: Verify proximity proof on-chain and create loan record.

#### Minimal Account Structure:

```rust
#[account]
pub struct LoanAccount {
    pub merchant: Pubkey,           // Merchant wallet
    pub customer: Pubkey,           // Customer wallet
    pub amount: u64,                // Fixed at 2 USDC (2_000_000 micro-USDC)
    pub timestamp: i64,             // Loan creation time
    pub proximity_proof_hash: [u8; 32], // Hash of verified proof
    pub status: LoanStatus,         // Pending | Approved | Rejected
    pub bump: u8,                   // PDA bump
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum LoanStatus {
    Pending,
    Approved,
    Rejected,
}

#[account]
pub struct ProximityProof {
    pub merchant: Pubkey,
    pub customer: Pubkey,
    pub rssi: i8,                   // Signal strength
    pub timestamp: i64,             // Unix timestamp
    pub nonce: [u8; 32],            // Random nonce
    pub customer_signature: [u8; 64], // Ed25519 sig
    pub merchant_signature: [u8; 64], // Ed25519 sig
}
```

#### Core Instructions (MVP):

```rust
// 1. Request loan with proximity proof
pub fn request_loan(
    ctx: Context<RequestLoan>,
    proof: ProximityProof,
) -> Result<()> {
    // Verify proximity proof
    verify_proximity(&proof, &ctx.accounts.customer.key(), &ctx.accounts.merchant.key())?;

    // Create loan account
    let loan = &mut ctx.accounts.loan;
    loan.merchant = ctx.accounts.merchant.key();
    loan.customer = ctx.accounts.customer.key();
    loan.amount = 2_000_000; // 2 USDC
    loan.timestamp = Clock::get()?.unix_timestamp;
    loan.proximity_proof_hash = hash_proof(&proof);
    loan.status = LoanStatus::Pending;
    loan.bump = *ctx.bumps.get("loan").unwrap();

    Ok(())
}

// 2. Approve loan (merchant only, for demo)
pub fn approve_loan(
    ctx: Context<ApproveLoan>,
) -> Result<()> {
    let loan = &mut ctx.accounts.loan;
    require!(ctx.accounts.merchant.key() == loan.merchant, ErrorCode::Unauthorized);
    loan.status = LoanStatus::Approved;
    Ok(())
}
```

#### Proximity Verification (On-Chain):

```rust
fn verify_proximity(
    proof: &ProximityProof,
    customer_pubkey: &Pubkey,
    merchant_pubkey: &Pubkey,
) -> Result<()> {
    // 1. Verify timestamp is recent (within 10 seconds)
    let current_time = Clock::get()?.unix_timestamp;
    require!(
        (current_time - proof.timestamp).abs() < 10,
        ErrorCode::ProofExpired
    );

    // 2. Verify RSSI is within valid range
    require!(
        proof.rssi >= -80 && proof.rssi <= -30,
        ErrorCode::TooFarAway
    );

    // 3. Construct message
    let message = hash_proximity_data(
        merchant_pubkey,
        customer_pubkey,
        proof.rssi,
        proof.timestamp,
        &proof.nonce,
    );

    // 4. Verify signatures (Ed25519)
    // Note: Simplified for hackathon - production needs more robust sig verification
    let customer_sig_valid = verify_ed25519_sig(
        &proof.customer_signature,
        &message,
        customer_pubkey.as_ref(),
    );
    let merchant_sig_valid = verify_ed25519_sig(
        &proof.merchant_signature,
        &message,
        merchant_pubkey.as_ref(),
    );

    require!(customer_sig_valid && merchant_sig_valid, ErrorCode::InvalidSignature);

    Ok(())
}
```

---

### 3. Web App (Next.js - Simplified)

**Goal**: Simple web UI for demo - merchant broadcasts, customer scans and requests loan via two browser tabs.

#### Tech Stack:

- **Framework**: Next.js 14 (React + TypeScript)
- **Mock BLE**: WebSocket (Socket.io) for tab-to-tab communication
- **Solana**: `@solana/web3.js` + `@solana/wallet-adapter-react`
- **Crypto**: `tweetnacl` for Ed25519 signatures
- **Wallet**: Phantom Browser Extension (or generate keypairs in demo)
- **Styling**: TailwindCSS
- **Local Validator**: `solana-test-validator` (Anchor LocalNet)

#### Two Browser Tabs (Demo UI):

**Tab 1 - Merchant Page (`/merchant`):**

```
┌──────────────────────────────────┐
│  🏪 NanoCredit Merchant          │
├──────────────────────────────────┤
│                                  │
│  Wallet: 7xKx...uT2m             │
│                                  │
│  [Start Broadcasting] 🟢         │
│                                  │
│  Status: Broadcasting...         │
│  Nonce: a3f9e2...                │
│  Timestamp: 1730304561           │
│                                  │
│  📡 Waiting for customers...     │
│                                  │
│  Pending Loan Requests: 0        │
│                                  │
└──────────────────────────────────┘
```

**Tab 2 - Customer Page (`/customer`):**

```
┌──────────────────────────────────┐
│  👤 NanoCredit Customer          │
├──────────────────────────────────┤
│                                  │
│  Wallet: 9mBv...kL8p             │
│  Credit Limit: $2.00             │
│                                  │
│  [Scan for Merchants] 🔍         │
│                                  │
│  📍 Nearby Merchants:            │
│  ┌────────────────────────────┐ │
│  │ 🏪 Store #1                │ │
│  │ Distance: ~5 meters        │ │
│  │ RSSI: -65 dBm              │ │
│  │ [Request $2 Loan]          │ │
│  └────────────────────────────┘ │
│                                  │
└──────────────────────────────────┘
```

#### User Flow (Demo):

```
Merchant Tab (localhost:3000/merchant):
1. Open browser tab
2. Generate/connect wallet keypair
3. Click "Start Broadcasting"
4. WebSocket server starts broadcasting {pubkey, nonce, timestamp}
5. Wait for loan request (see notification)
6. View loan details and approve

Customer Tab (localhost:3000/customer):
1. Open second browser tab
2. Generate/connect wallet keypair
3. Click "Scan for Merchants"
4. WebSocket connects and receives merchant broadcast
5. See merchant appear with simulated RSSI distance
6. Click "Request $2 Loan"
7. App generates proximity proof with real Ed25519 signatures
8. Transaction submitted to local Solana validator
9. View transaction in local Solana Explorer
10. See "Loan Created" confirmation
```

**Demo Flow Visualization:**

```
Tab 1 (Merchant)         WebSocket Server        Tab 2 (Customer)
      │                        │                         │
      ├──[Start Broadcast]────>│                         │
      │                        ├──[Broadcast Data]──────>│
      │                        │                         ├──[Scan & Detect]
      │                        │<────[Proof Request]─────┤
      │<───[Sign Merchant]─────┤                         │
      │                        ├────[Customer Signs]────>│
      │                        │                         ├──[Submit to Solana]
      │                        │                         │
      │                    Local Solana Validator        │
      │                        ├────[Verify Proof]───────┤
      │                        ├────[Create Loan]────────┤
      │                        │                         │
      ├──[Notification]────────┴─────[Success]──────────>│
```

---

## 🔒 Security (Simplified for MVP)

### What We Verify:

1. ✅ **Physical Proximity**: RSSI must be ≤ -80 dBm
2. ✅ **Timestamp Freshness**: Proof must be < 10 seconds old
3. ✅ **Cryptographic Signatures**: Both parties must sign the proof
4. ✅ **Nonce Uniqueness**: Each proof has unique random nonce

### What We DON'T Handle in MVP:

- ❌ Replay attack prevention (need nonce storage)
- ❌ Relay attack prevention (need advanced timing)
- ❌ Sybil resistance (would need Civic Pass)
- ❌ Merchant collusion (would need staking)

**Note**: These are documented as "known limitations" for the hackathon demo.

---

## 💻 System Requirements (Local Demo)

| Component  | Minimum             | Notes                                |
| ---------- | ------------------- | ------------------------------------ |
| OS         | macOS/Linux/Windows | Any OS that runs Node.js             |
| Node.js    | 18.0+               | For Next.js app                      |
| Rust       | 1.70+               | For Anchor/Solana programs           |
| Solana CLI | 1.18+               | For local validator                  |
| Anchor     | 0.29+               | For Solana program development       |
| Browser    | Chrome/Firefox      | Modern browser for wallet extensions |
| RAM        | 4 GB                | To run local validator + dev server  |

**Development Setup:**

```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Install Anchor
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest

# Install Node.js dependencies
npm install
```

**Production Mobile Requirements** (Post-Hackathon):

- Android 8.0+ with BLE 4.0
- iOS 12.0+ with CoreBluetooth
- React Native with `react-native-ble-manager`

---

## 📊 Success Criteria (Hackathon)

### Must Have:

- ✅ Two browser tabs communicate via WebSocket (mock BLE)
- ✅ Generate valid proximity proof with real Ed25519 signatures
- ✅ Solana program verifies proof on-chain (local validator)
- ✅ Complete loan request flow works end-to-end
- ✅ Transaction visible in local Solana Explorer
- ✅ Demo video shows working prototype
- ✅ Clear explanation of what's real vs simulated

### Out of Scope:

- ❌ Real BLE on mobile devices (documented for production)
- ❌ DevNet/Mainnet deployment
- ❌ USDC token transfers (just record loan state)
- ❌ Repayment functionality
- ❌ Credit scoring system
- ❌ Multi-user pilot testing
- ❌ Civic Pass integration

---

## 🔧 Technical Challenges & Solutions

| Challenge                               | MVP Solution                                                  |
| --------------------------------------- | ------------------------------------------------------------- |
| **Real BLE implementation time**        | Simulate with WebSockets, document production approach        |
| **Signature verification compute cost** | Optimize by hashing proof data first, test on localnet        |
| **Multi-tab state synchronization**     | Use Socket.io for real-time WebSocket communication           |
| **Wallet integration complexity**       | Option to use generated keypairs OR Phantom browser extension |
| **Local validator setup**               | Use Anchor's built-in `anchor localnet` command               |
| **Time constraint (6 days)**            | Focus on core innovation, accept simulation for BLE           |
| **Demo reliability**                    | Local setup avoids network issues during presentation         |

---

## 📦 Deliverables

### GitHub Repository:

```
nanocredit-solana/
├── programs/
│   └── nanocredit/                  # Anchor program
│       ├── src/
│       │   ├── lib.rs               # Main program logic
│       │   ├── instructions/        # Instruction handlers
│       │   │   ├── request_loan.rs
│       │   │   └── approve_loan.rs
│       │   └── state/               # Account structures
│       │       ├── loan.rs
│       │       └── proximity_proof.rs
│       └── tests/
│           └── nanocredit.ts        # Anchor tests
├── app/                             # Next.js web app
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx             # Landing page
│   │   │   ├── merchant/
│   │   │   │   └── page.tsx         # Merchant UI
│   │   │   ├── customer/
│   │   │   │   └── page.tsx         # Customer UI
│   │   │   └── api/
│   │   │       └── socket/
│   │   │           └── route.ts     # WebSocket server
│   │   ├── components/
│   │   │   ├── MerchantBroadcast.tsx
│   │   │   ├── CustomerScanner.tsx
│   │   │   └── ProofViewer.tsx
│   │   ├── lib/
│   │   │   ├── solana.ts            # Solana connection
│   │   │   ├── proximity.ts         # Proof generation
│   │   │   └── websocket.ts         # Socket.io client
│   │   └── types/
│   │       └── proximity.ts         # TypeScript types
│   ├── package.json
│   └── next.config.js
├── docs/
│   ├── ARCHITECTURE.md              # System design
│   ├── DEMO_GUIDE.md                # How to run demo
│   ├── PRODUCTION_BLE.md            # Real BLE implementation plan
│   └── WHY_SIMULATED.md             # Rationale for demo approach
├── demo/
│   ├── pitch-video.mp4              # 3-minute pitch
│   ├── tech-demo.mp4                # Technical walkthrough
│   └── slides/                      # Presentation slides
├── Anchor.toml
├── package.json
└── README.md                        # Setup instructions
```

### Documentation:

1. **README.md** - Quick start, setup, and run instructions
2. **docs/ARCHITECTURE.md** - System architecture and design decisions
3. **docs/DEMO_GUIDE.md** - Step-by-step demo walkthrough
4. **docs/PRODUCTION_BLE.md** - Real BLE implementation for production
5. **docs/WHY_SIMULATED.md** - Why we simulated BLE for the hackathon

---

## 💡 Key Innovation (Pitch Point)

**"We built the first cryptographic proximity proofs on Solana - proving two parties are physically together without GPS, enabling uncollateralized nano-loans that can't be faked by bot farms."**

### What Makes This Special:

1. **Novel**: First proximity verification system on Solana blockchain
2. **Practical**: Real Ed25519 signatures and on-chain verification (BLE simulated for demo speed)
3. **Privacy-Preserving**: No GPS or location tracking
4. **Fraud-Resistant**: Cryptographic proofs can't be spoofed remotely
5. **Solana-Native**: Leverages low transaction costs (<$0.001)
6. **Production-Ready Design**: Clear path from demo to mobile BLE implementation

### Demo Approach (Be Honest with Judges):

> "For this hackathon, we **simulated BLE with WebSockets** to focus on proving the core innovation: **on-chain proximity proof verification**. The Ed25519 signatures are real, the Solana program logic is real, and the verification algorithm is production-ready. For production deployment, we'd use `react-native-ble-manager` with the exact same cryptographic proof structure - just replacing WebSockets with actual Bluetooth Low Energy communication."

**Why This Approach:**

- ✅ Proves the innovation works (cryptographic verification on Solana)
- ✅ Faster development (6 days vs 2+ weeks for mobile BLE debugging)
- ✅ Reliable demo (no Bluetooth pairing issues during presentation)
- ✅ Focus on what matters (the on-chain verification logic)
- ✅ Clear production roadmap documented

---

## 📱 Production BLE Implementation (Post-Hackathon)

### Transition from Demo to Production:

| Component          | Hackathon Demo        | Production Implementation        |
| ------------------ | --------------------- | -------------------------------- |
| **Communication**  | WebSocket (Socket.io) | React Native BLE Manager         |
| **Platform**       | Web (Next.js)         | Mobile (React Native)            |
| **RSSI**           | Hardcoded (-65 dBm)   | Real signal strength measurement |
| **Signatures**     | ✅ Real Ed25519       | ✅ Real Ed25519 (same)           |
| **Solana Program** | ✅ Real verification  | ✅ Real verification (same)      |
| **Deployment**     | Local validator       | Solana Mainnet                   |

### Production Tech Stack:

```typescript
// Mobile App Stack
- React Native 0.72+
- react-native-ble-manager (BLE communication)
- @solana/mobile-wallet-adapter (Phantom/Solflare)
- @noble/ed25519 (signatures)
- Solana Mobile SDK

// BLE Implementation
const BLEManager = require('react-native-ble-manager');

// Merchant: Broadcast beacon
BLEManager.startAdvertising({
  serviceUUIDs: ['nanocredit-merchant'],
  advertisingName: 'NanoCredit-Merchant',
  txPowerLevel: 3,
  includeDeviceName: true,
});

// Customer: Scan for merchants
BLEManager.scan([], 5, true).then(() => {
  // Filter by RSSI threshold
  BLEManager.getDiscoveredPeripherals().then(peripherals => {
    const nearby = peripherals.filter(p => p.rssi >= -80);
    // Generate proximity proof with real RSSI
  });
});
```

### Timeline to Production:

- **Week 1-2**: Convert web app to React Native
- **Week 3**: Implement real BLE scanning/advertising
- **Week 4**: Test on Android/iOS devices
- **Week 5**: Deploy Solana program to Mainnet
- **Week 6**: Pilot with 3 merchants in Philippines

---

## 🎯 Post-Hackathon Roadmap (If Selected for Accelerator)

**Month 1-2**: Production-ready version

- Add Civic Pass for identity verification
- Implement merchant staking
- Add USDC token transfers
- Security audit

**Month 3-4**: Philippines pilot

- Onboard 10 merchants
- 200 verified customers
- $10,000 loan volume

**Month 5-6**: Scale

- 50 merchants
- 2,000 customers
- Iterate based on feedback

---

**Built for Colosseum Cypherpunk Hackathon 2025**  
**Approach**: Local Solana + Web App Demo (BLE simulated via WebSocket)  
**Timeline**: 6 days  
**Goal**: Prove cryptographic proximity verification works on Solana  
**Innovation**: First proximity proofs on blockchain for fraud-resistant nano-loans
