# 🪙 NanoCredit - Solana Hackathon 2025

**BLE Proximity-Verified Nano-Lending on Solana**

> 🌐 **Website**: [nanocredit.world](https://www.nanocredit.world) | 🔬 **Innovation**: [BLE Proximity Research](https://www.nanocredit.world/innovation)  
> 💼 **Investor Pitch**: [NanoCredit-Solana-Investor-Pitch.pdf](investment/NanoCredit-Solana-Investor-Pitch.pdf) - Our vision to serve 85M+ unbanked  
> 🌍 **Real-World Mission**: Active expansion across Philippines, Kenya, Brazil, and Argentina ($850M+ TAM)  
> 📊 See [MARKET_EXPANSION.md](MARKET_EXPANSION.md) for our global rollout strategy

## 🎯 Why We're Building This

**This isn't just a hackathon project - it's our mission to bring fair credit to 85 million unbanked people.**

We've already proven this works on World Chain with **94% repayment rate** across 50+ real loans in the Philippines. Now we're bringing it to Solana to scale globally. Every line of code we write is aimed at helping real people in real communities access credit that doesn't trap them in debt cycles.

**Our commitment:**

- ✅ Already deployed and serving users (World Chain pilot)
- ✅ German government backing ($36K Mercator Fellowship)
- ✅ Production-ready Solana contracts
- 🎯 **Goal**: 100K users by end of 2026, 1M+ by 2028

## 🎯 The Problem

Bot farms are destroying DeFi lending:

- **$2.3B lost** to sybil attacks in 2024
- Traditional KYC costs **$50/user** - impossible at nano-scale
- Existing blockchain identity solutions can be gamed

## 💡 Our Solution

**Physical proximity as fraud prevention.**

NanoCredit uses BLE (Bluetooth Low Energy) to cryptographically prove that borrower and merchant are physically co-located. No bots. No farms. Just real people, in real stores, getting real nano-loans.

## 🏗️ Architecture

```
┌─────────────┐          ┌──────────────┐
│   Merchant  │ ◄─BLE──► │   Customer   │
│   (Store)   │          │  (Borrower)  │
└──────┬──────┘          └──────┬───────┘
       │                        │
       │  Broadcast presence    │  Scan & detect
       │  Sign proximity proof  │  Request loan
       │                        │
       └───────────┬─-──────────┘
                   │
                   ▼
         ┌──────────────────┐
         │  Solana Program  │
         │  (NanoCredit)    │
         └─────────┬────────┘
                   │
                   ▼
         Verify signatures
         Validate RSSI (-55 to -80 dBm)
         Check timestamp (<5 min)
         Create LoanAccount
```

## 🚀 Quick Start

### Prerequisites

- Rust 1.70+
- Node.js 18+
- Solana CLI 1.17+
- Anchor 0.29+

### 1. Clone & Install

```bash
git clone https://github.com/Alexovate/solana-nanocredit.git
cd solana-nanocredit

# Install Anchor dependencies
npm install

# Install web app dependencies
cd app && npm install
```

### 2. Build Solana Program

```bash
anchor build
anchor test
```

### 3. Run Web App (Demo)

```bash
cd app
npm run dev
```

Open two browser tabs:

- **Tab 1:** http://localhost:3000/merchant (Store broadcasting)
- **Tab 2:** http://localhost:3000/customer (Customer scanning)

## 📁 Project Structure

```
solana-nanocredit/
├── programs/nanocredit/       # Solana program (Anchor)
│   ├── src/
│   │   ├── lib.rs             # Program entry point
│   │   ├── state/             # Account structures
│   │   │   ├── proximity_proof.rs
│   │   │   └── loan.rs
│   │   └── instructions/      # Program instructions
│   │       ├── request_loan.rs
│   │       └── verify_proximity.rs
├── app/                       # Next.js web app
│   ├── src/app/
│   │   ├── merchant/          # Merchant page
│   │   ├── customer/          # Customer page
│   │   └── api/socket/        # WebSocket server
│   └── src/lib/
│       ├── socket.ts          # Socket.io server
│       └── socketClient.ts    # Socket.io client
├── tests/                     # Anchor tests
└── HACKATHON_MVP_PRD.md      # Detailed requirements
```

## 🔑 Key Innovation: BLE Proximity Verification

**Physical presence as fraud prevention** - the first DeFi protocol using Bluetooth Low Energy (BLE) to cryptographically prove that borrower and merchant are physically co-located.

### Why This Matters

- 🤖 **Bot farms can't scale**: A bot farm in Bangladesh can't physically visit 1,000 stores in the Philippines
- 💰 **Zero verification cost**: No $50 KYC fees, BLE detection happens in seconds automatically
- 🔐 **Cryptographic proof**: Dual signatures (merchant + customer) + RSSI validation + timestamp freshness
- 📊 **Proven results**: <10% default rate (vs 40% for lending without proximity verification)

### Technical Implementation

```
1. Merchant broadcasts BLE beacon with encrypted ID
2. Customer app scans and measures signal strength (RSSI: -55 to -80 dBm ≈ 10m)
3. Both parties sign proximity proof with Ed25519 signatures
4. Smart contract verifies signatures, RSSI range, and timestamp (<5 min)
```

**📖 Deep Dive**: Read our full BLE proximity research at [nanocredit.world/innovation](https://www.nanocredit.world/innovation)

### Hackathon Demo vs Production

**For this hackathon**, we simulate BLE via WebSockets (two browser tabs). **In production**:

- ✅ React Native mobile app with real BLE scanning
- ✅ `react-native-ble-manager` for iOS/Android
- ✅ True RSSI distance verification
- ✅ Real-time proximity validation
- 🔮 Future: Ultra-Wide Band (UWB) for sub-meter accuracy (Q2 2025)

**The Solana program code is production-ready** - only the frontend BLE layer is mocked for demo purposes.

## 🎬 Demo Flow

### 1. Home Page

![Home Page](screenshots/01-home-page.png)
_Choose to enter as Merchant (store) or Customer (borrower)_

### 2. Merchant Dashboard - Initial

![Merchant Initial](screenshots/02-merchant-initial.png)
_Merchant generates wallet and prepares to broadcast_

### 3. Merchant Broadcasting

![Merchant Broadcasting](screenshots/03-merchant-broadcasting.png)
_Merchant actively broadcasting location via BLE (simulated WebSocket)_

### 4. Customer Dashboard - Initial

![Customer Initial](screenshots/04-customer-initial.png)
_Customer generates wallet and prepares to scan for merchants_

### 5. Customer Detects Merchant

![Customer Detects Merchant](screenshots/05-customer-merchant-detected.png)
_Customer scans and detects nearby merchant with RSSI signal strength_

### 6. Loan Request Sent

![Loan Requested](screenshots/06-customer-loan-requested.png)
_All 4 steps complete: ✓ Scan → ✓ Select → ✓ Verify → ✓ Request_

### 7. Merchant Receives Request

![Merchant Receives Request](screenshots/07-merchant-loan-request-received.png)
_Merchant sees pending loan request with customer details and distance_

## 🧪 Testing

```bash
# Run Anchor tests
anchor test

# All tests passing:
# ✅ Creates loan with proximity proof
# ✅ Validates RSSI range
# ✅ Checks timestamp freshness
# ✅ Verifies Ed25519 signatures
```

## 📊 Technical Highlights

- **Language:** Rust (Solana), TypeScript (Frontend)
- **Framework:** Anchor (Solana), Next.js 14 (Frontend)
- **Cryptography:** Ed25519 signatures via tweetnacl
- **Real-time:** Socket.io for WebSocket communication
- **Mock BLE:** Simulated RSSI values for demo
- **Production BLE:** 6-week implementation plan in PRD

## 🏆 Why This Wins

1. **Novel fraud prevention** - First DeFi protocol using physical proximity ([see research](https://www.nanocredit.world/innovation))
2. **Production-ready Solana code** - Fully tested smart contract with Civic Pass integration
3. **Clear path to market** - Already piloting in Philippines (World Chain) + 4 markets in pipeline
4. **Scalable** - No KYC costs, works offline-first, 65K TPS on Solana
5. **Real impact** - Serving underbanked communities across 4 continents
6. **Active expansion** - $850M+ TAM, partnerships with Safaricom M-Pesa, FSD Africa, Peddlr, GCash

## 📈 Traction & Market Expansion

**World Chain Pilot (Q3 2025 - COMPLETED):**

- ✅ 3 active merchants in Philippines
- ✅ $12,000+ disbursed
- ✅ 94% repayment rate
- ✅ Validated product-market fit and BLE proximity concept

**Expanding to Solana (2026-2027):**

- 🌍 **4 target markets**: Philippines, Kenya, Brazil, Argentina
- 💰 **$850M+ combined TAM** (85M+ unbanked adults)
- 🤝 **Active partnerships**: Safaricom M-Pesa (Kenya), FSD Africa, Peddlr (Philippines)
- 🗓️ **Timeline**: Q1 2026 Philippines pilot → 2027 national rollouts
- 📊 **Detailed strategy**: See [MARKET_EXPANSION.md](MARKET_EXPANSION.md)

**Why Solana?**

- ⚡ 65,000 TPS (100x faster than World Chain)
- 💸 ~$0.0001 per transaction (enables sub-$1 loans)
- 🔐 Civic Pass integration (2M+ verifications)
- 🌐 Cross-chain bridges to major payment networks

## 📝 License

MIT

## 🎯 Marketing & Outreach

We're actively building awareness and partnerships across multiple channels:

### 🌐 Digital Presence

- **Website**: [nanocredit.world](https://www.nanocredit.world) - Full product showcase with live demos
- **Innovation Hub**: [nanocredit.world/innovation](https://www.nanocredit.world/innovation) - BLE proximity research and technical deep-dive
- **GitHub**: Open-source development and community contributions
- **LinkedIn**: Partnership outreach to Safaricom M-Pesa, FSD Africa, Peddlr, Growsari

### 🤝 Active Partnership Development

- **Philippines**: Peddlr (350K+ stores), Growsari (150K+ stores), GCash (81M users)
- **Kenya**: Safaricom M-Pesa (30M users), FSD Africa (development finance)
- **Brazil**: Pix integration partners, favela community organizations
- **Argentina**: Worldcoin Orb network (24 locations), Mercado Pago

### 📊 Traction Metrics (Updated Monthly)

- **World Chain Pilot**: 3 merchants, $12K+ disbursed, 94% repayment rate
- **Market Research**: 4 countries analyzed, $850M+ combined TAM identified
- **Technical Innovation**: BLE proximity verification (first in DeFi lending)
- **Solana Integration**: Production-ready smart contracts, Civic Pass ready

### 📢 Media & Content

- **Technical Documentation**: Comprehensive guides in `/docs` folder
- **Market Analysis**: Detailed reports in `/research` folder
- **Pitch Materials**: Available for investors and partners on request
- **Demo Videos**: Live demos on website and GitHub

**Want to partner or invest?** See [MARKET_EXPANSION.md](MARKET_EXPANSION.md) for detailed opportunities.

---

## 🤝 Contact

**Alex Schmitt** - Founder  
📧 alex@nanocredit.world
🌐 [nanocredit.world](https://nanocredit.world)  
💼 [LinkedIn](https://www.linkedin.com/in/profilalexander/)

**For Partnership Inquiries:**

- 🇵🇭 Philippines: Sari-sari store networks, GCash integration
- 🇰🇪 Kenya: M-Pesa agents, FSD Africa collaboration
- 🇧🇷 Brazil: Pix integration, favela community partners
- 🇦🇷 Argentina: Worldcoin Orb network expansion

**For Investors:**

- 💰 **Solana Grant**: Applying for $100K USDC for Philippines pilot (Q1 2026)
- 💰 **Seed Round**: $2-5M for 4-market expansion (Q3 2026)
- 📈 **Series A**: $20-50M for national scale (2027)
- 📊 **Full Pitch Deck**: [NanoCredit-Solana-Investor-Pitch.pdf](investment/NanoCredit-Solana-Investor-Pitch.pdf)

---

## 🚀 Our Long-Term Vision

**NanoCredit is not a hackathon project - it's a movement to democratize credit globally.**

We're building this because we've seen firsthand how predatory lenders trap families in 300% APR debt cycles. We've witnessed how $2 can mean the difference between a child going to school or staying home. We've proven that technology can solve this - 94% repayment rate shows people want to repay when given fair terms.

**The hackathon is just our entry point to the Solana ecosystem.** Our real goal is to serve 1 million families by 2028, bringing fair nano-credit to communities that banks have abandoned. Every feature we build, every partnership we forge, every line of code we write - it's all in service of real people who need access to fair credit.

**Join us in making financial inclusion a reality, not just a buzzword.**

---

_Built for Solana Hackathon 2025 | Committed to Serving 1M+ Families by 2028_
