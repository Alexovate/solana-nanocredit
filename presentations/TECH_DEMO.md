---
marp: true
theme: default
paginate: true
backgroundColor: "#121212"
color: "#E0E0E0"
header: '<div style="text-align: right;"><span style="color: #14F195; font-weight: bold; font-size: 1em;">NanoCredit | Technical Demo</span></div>'
style: |
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&family=Space+Grotesk:wght@700&family=Fira+Code:wght@400;500&display=swap');

  section {
    font-family: 'Work Sans', sans-serif;
    padding: 40px;
    font-size: 0.9em;
    background-color: #121212;
    color: #E0E0E0;
  }
  header {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 3.5em;
    margin-bottom: 0.3em;
    color: #9945FF;
  }
  h2 {
    color: #f8f8f8;
    margin-top: 0.3em;
    margin-bottom: 0.2em;
    font-size: 2.4em;
  }
  h3 {
    display: inline-block;
    background-color: #9945FF;
    color: #f8f8f8 !important;
    padding: 2px 12px;
    border-radius: 4px;
    margin-top: 0.8em;
    margin-bottom: 0.5em;
    font-size: 1.8em;
    font-weight: 600;
  }
  .intro {
    text-align: center;
  }
  .intro h1 {
    color: #9945FF;
    font-family: 'Space Grotesk', cursive;
    font-size: 7em;
  }
  .tagline {
    font-size: 2.5em;
    font-style: italic;
    color: #E0E0E0;
    margin-top: 0;
    margin-bottom: 2em;
  }
  ul {
    margin-top: 0.1em;
    margin-bottom: 0.1em;
    padding-left: 1.2em;
  }
  li {
    margin-bottom: 0.2em;
    font-size: 1.4em;
    color: #E0E0E0;
  }
  .highlight {
    color: #9945FF;
    font-weight: bold;
  }
  code {
    background: rgba(153, 69, 255, 0.2);
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Fira Code', monospace;
    color: #14F195;
    font-size: 0.85em;
  }
  pre {
    background: rgba(13, 13, 13, 0.8);
    border: 1px solid rgba(153, 69, 255, 0.3);
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    font-family: 'Fira Code', monospace;
    font-size: 0.75em;
    line-height: 1.4;
  }
  .columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
  }
  .decision-box {
    background-color: rgba(153, 69, 255, 0.15);
    border: 1px solid rgba(153, 69, 255, 0.3);
    border-radius: 8px;
    padding: 12px;
    margin: 10px 0;
  }
  .decision-heading {
    font-weight: bold;
    font-size: 1.3em;
    margin-bottom: 5px;
  }
  .proof-box {
    background-color: rgba(20, 241, 149, 0.15);
    border: 1px solid #14F195;
    border-radius: 8px;
    padding: 12px;
    margin-top: 15px;
    font-size: 1.3em;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  .demo-step {
    background: rgba(153, 69, 255, 0.1);
    border-left: 4px solid #9945FF;
    padding: 10px 15px;
    margin: 8px 0;
    font-size: 1.2em;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    font-size: 1.3em;
  }
  th {
    background: rgba(153, 69, 255, 0.4) !important;
    color: #FFFFFF !important;
    padding: 12px;
    text-align: left;
    font-weight: 700;
    border: 1px solid rgba(153, 69, 255, 0.5);
  }
  td {
    background: rgba(13, 13, 13, 0.8) !important;
    color: #E0E0E0 !important;
    padding: 12px;
    border: 1px solid rgba(153, 69, 255, 0.3);
  }
  td strong {
    color: #14F195 !important;
    font-weight: 700;
  }
---

<div class="intro">

# NanoCredit:</br><span style="font-size: 0.8em;">Technical Implementation</span>

<div style="text-align:center; margin-top:20px;">
  <span class="tagline">BLE Proximity-Verified Lending on Solana</span>
</div>

</div>

<!--
SCRIPT (10 seconds):
"I'm Alex from NanoCredit. We stop bot farm fraud in DeFi using BLE proximity verification.

Bot farms drain protocols with fake accounts. Our solution: cryptographic proof of physical co-location. Bot farms can't fake being there."
-->

---

# Live Demo: Working End-to-End Flow

<div class="columns">
<div>

### The Flow (Demo Video)

<div class="demo-step">
📱 1. Merchant starts broadcasting
</div>

<div class="demo-step">
🔍 2. Customer scans (detects merchant)
</div>

<div class="demo-step">
✍️ 3. Ed25519 signatures generated
</div>

<div class="demo-step">
📤 4. Loan request sent
</div>

<div class="demo-step">
✅ 5. Merchant sees pending request
</div>

</div>
<div>

### Implementation Status

<div class="proof-box">
✅ Working Demo (WebSockets)
</div>

<div class="proof-box">
✅ Complete Anchor Program
</div>

<div class="proof-box">
✅ All Tests Passing
</div>

<div class="proof-box">
📸 7 Screenshots in Repo
</div>

</div>
</div>

<!--
SCRIPT (25 seconds):
"Live demo: Merchant broadcasts. Customer scans, detects at -62 dBm, 5 meters away. Requests $2 loan. Both sign with Ed25519. Proximity proof with RSSI, timestamp, nonce submitted to Anchor program. Verified on-chain. Merchant sees request. Total: 5 seconds.

WebSockets simulate BLE for demo. The crypto and verification? Production-ready."
-->

---

# Technical Stack

<div class="columns">
<div>

### 📱 Frontend

**Hackathon Demo:** Next.js + Socket.io
**Production:** React Native + Solana Mobile SDK

- BLE scanning (`react-native-ble-manager`)
- Ed25519 signatures (`tweetnacl`)
- Real-time WebSocket communication
- Mobile-first design

### 🔐 Key Features

- Proximity detection (BLE)
- Cryptographic proof generation
- Signal strength (RSSI) verification
- Replay attack prevention

</div>
<div>

### ⚙️ Solana Program

**Anchor Framework** v0.29 ✅

- Proximity proof verification
- RSSI validation (-55 to -80 dBm)
- Ed25519 signature checks
- Timestamp freshness (<5 min)
- Replay attack prevention

### 🛡️ Security Layers

1. **Physical**: BLE radio proximity
2. **Cryptographic**: Ed25519 signatures
3. **Temporal**: Timestamp freshness
4. **Anti-Replay**: Unique nonce tracking

</div>
</div>

<!--
SCRIPT (15 seconds):
"Architecture: Next.js demo, React Native production. Anchor program: RSSI validation, timestamp check, Ed25519 signatures, nonce tracking.

Why BLE? GPS spoofed, QR screenshot, video deepfaked. Radio physics can't be faked. Blockchain = immutable truth of physical proximity."
-->

---

# Critical Decision: Why BLE?

### Alternatives We Rejected

| Method          | Why It Fails                    | Cost                     |
| --------------- | ------------------------------- | ------------------------ |
| **GPS**         | Spoofed with mock location apps | Remote attack            |
| **IP Address**  | VPNs bypass geolocation         | Remote attack            |
| **QR Codes**    | Screenshots can be shared       | Remote attack            |
| **Video Calls** | Deepfakes, screen sharing       | Remote attack            |
| **Manual KYC**  | Expensive, slow onboarding      | Impractical for $2 loans |

### Why BLE Wins

<div class="columns">
<div>

✅ **Physical layer** = can't fake remotely
✅ **Ed25519 signatures** = cryptographic
✅ **RSSI verification** = distance proof

</div>
<div>

✅ **Unique nonce** = replay prevention
✅ **$0 cost, 2 seconds** = scalable
✅ **Works anywhere** = no internet needed

</div>
</div>

<!--
SCRIPT (8 seconds):
"Why BLE? GPS, QR, video all faked remotely. BLE = physical layer, 10 meter max. Radio physics can't lie. Zero cost, 2 seconds."
-->

---

# Anchor Program: Security Model

<div class="columns">
<div>

### 5-Step Verification

```rust
pub fn request_loan(
    ctx: Context<RequestLoan>,
    amount: u64,
    rssi: i8,
    timestamp: i64,
    nonce: [u8; 32],
    customer_sig: [u8; 64],
    merchant_sig: [u8; 64],
) -> Result<()> {
    // 1. Validate RSSI range
    require!(rssi >= -80 && rssi <= -55);

    // 2. Check timestamp freshness
    let now = Clock::get()?.unix_timestamp;
    require!(now - timestamp < 300); // 5 min

    // 3. Verify Ed25519 signatures
    verify_ed25519_signatures()?;

    // 4. Create loan account
    create_loan_account(&ctx, amount)?;
    Ok(())
}
```

</div>
<div>

### Why This Works

<div class="decision-box">
<div class="decision-heading">🔒 Proximity Proof</div>
Ed25519 signatures + RSSI verification prevents remote attacks
</div>

<div class="decision-box">
<div class="decision-heading">📡 RSSI Validation</div>
Signal strength between -55 and -80 dBm = max 10 meter range
</div>

<div class="decision-box">
<div class="decision-heading">⏱️ Timestamp Check</div>
Proof must be < 5 minutes old to prevent replay attacks
</div>

<div class="decision-box">
<div class="decision-heading">🔢 Nonce Tracking</div>
Each proof uses unique nonce - prevents double-spending
</div>

</div>
</div>

<!--
SCRIPT (20 seconds):
"Four on-chain checks: RSSI proves 10 meters max. Timestamp under 5 minutes stops replays. Ed25519 signatures verify both parties. Unique nonce prevents reuse.

On-chain verification = immutable audit trail. No central server. Bot farms physically cannot work. Production-ready, full test coverage."
-->

---

# Why Solana?

<div class="columns">
<div>

### Only Solana Enables This

<div class="decision-box">
<div class="decision-heading">⚡ 400ms blocks</div>
Instant in-person UX
</div>

<div class="decision-box">
<div class="decision-heading">💰 $0.002 txns</div>
$2 loans stay profitable
</div>

<div class="decision-box">
<div class="decision-heading">📱 Mobile Stack</div>
BLE + Saga + SDK
</div>

<div class="decision-box">
<div class="decision-heading">⚙️ Anchor + SPL</div>
Built in 3 days
</div>

</div>
<div>

### What We Built

<div style="margin-bottom: 0.8em;">
<div style="background: rgba(20, 241, 149, 0.25); padding: 0.7em; border-radius: 6px; border-left: 4px solid #14F195;">
<div style="font-size: 1.4em; font-weight: 700; color: #14F195; margin-bottom: 0.2em;">✅ Complete</div>
<div style="font-size: 0.9em;">BLE protocol + Anchor program + Working demo</div>
</div>
</div>

<div style="margin-bottom: 0.8em;">
<div style="background: rgba(153, 69, 255, 0.15); padding: 0.7em; border-radius: 6px; border-left: 4px solid #9945FF;">
<div style="font-size: 1.4em; font-weight: 700; color: #9945FF; margin-bottom: 0.2em;">📸 Documented</div>
<div style="font-size: 0.9em;">7 screenshots + README + GitHub</div>
</div>
</div>

<div style="margin-bottom: 0.8em;">
<div style="background: rgba(20, 241, 149, 0.15); padding: 0.7em; border-radius: 6px; border-left: 4px solid #14F195;">
<div style="font-size: 1.4em; font-weight: 700; color: #14F195; margin-bottom: 0.2em;">🚀 Production</div>
<div style="font-size: 0.9em;">React Native + Mobile Stack + 10 merchant pilot</div>
</div>
</div>

</div>
</div>

<div style="text-align: center; margin-top: 0.8em; padding: 0.6em; background: rgba(20, 241, 149, 0.1); border-radius: 6px; border: 2px solid #14F195;">
<span style="font-size: 1.3em; font-weight: 700; color: #14F195;">Competing for:</span> <span style="font-size: 1.2em;">Grand Champion | DeFi | Consumer Apps | Infrastructure</span>
</div>

<!--
SCRIPT (20 seconds):
"Why Solana? 400ms blocks, sub-cent fees, mobile ecosystem, Anchor framework.

Complete: BLE protocol, Anchor program, all tests passing, working demo.

Three tracks: DeFi - stop fraud. Consumer Apps - serve real users. Infrastructure - reusable proximity protocol.

GitHub: solana-nanocredit. Ready to scale. Thank you!"
-->
