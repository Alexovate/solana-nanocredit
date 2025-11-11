---
marp: true
theme: default
paginate: true
backgroundColor: "#121212"
color: "#E0E0E0"
header: '<div style="text-align: right;"><span style="color: #14F195; font-weight: bold; font-size: 1em;">NanoCredit | Colosseum Cypherpunk 2025</span></div>'
style: |
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&family=Space+Grotesk:wght@700&display=swap');

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
  .track-badge {
    background-color: #14F195;
    color: #121212;
    font-weight: bold;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 1.2em;
    display: inline-block;
    margin: 0 8px;
  }
  .columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .stat-box {
    background-color: rgba(153, 69, 255, 0.15);
    border-radius: 8px;
    padding: 12px;
    text-align: center;
    border: 1px solid rgba(153, 69, 255, 0.3);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  .stat-value {
    font-size: 2.2em;
    font-weight: bold;
    color: #9945FF;
  }
  .stat-label {
    font-size: 0.9em;
    color: #E0E0E0;
  }
  .problem-circle {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: rgba(153, 69, 255, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 2px solid #9945FF;
    margin: 0 auto;
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
  .timeline {
    display: flex;
    margin: 15px 0;
    justify-content: space-between;
  }
  .timeline-item {
    text-align: center;
    flex: 1;
    position: relative;
    font-size: 1.2em;
  }
  .timeline-item:not(:last-child):after {
    content: "";
    position: absolute;
    height: 2px;
    background-color: #9945FF;
    width: 100%;
    top: 15px;
    left: 50%;
  }
  .timeline-dot {
    width: 15px;
    height: 15px;
    background-color: #9945FF;
    border-radius: 50%;
    margin: 0 auto 5px;
    z-index: 1;
    position: relative;
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

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ 
    startOnLoad: true,
    theme: 'dark',
    themeVariables: {
      background: '#121212',
      primaryColor: '#9945FF',
      secondaryColor: '#14F195',
      tertiaryColor: '#282828',
      primaryTextColor: '#E0E0E0',
      lineColor: '#E0E0E0',
      textColor: '#E0E0E0'
    }
  });
</script>

<div class="intro">

# NanoCredit

<p class="tagline">BLE Proximity Verification<br/>Solves Bot Farm Fraud in DeFi</p>

<div>
<span class="track-badge">DeFi</span>
<span class="track-badge">Consumer Apps</span>
<span class="track-badge">Infrastructure</span>
</div>

</div>

<!--
SCRIPT (20 seconds):
"I'm Alex from NanoCredit. Every uncollateralized lending protocol has one critical vulnerability: bot farms.

1000 fake accounts can drain a protocol in minutes.

We solved this with BLE proximity verification - cryptographic proof that borrower and merchant are physically together.

Proven: 85% repayment rate, $12k+ disbursed. Now on Solana."
-->

---

# The Critical Problem

<div style="display: flex; justify-content: center; align-items: center; margin: 40px 0;">
  <div class="problem-circle">
    <div style="font-size: 2.5em; font-weight: bold; color: #ff6666;">1,000</div>
    <div style="font-size: 1em; padding: 0 10px;">fake accounts<br/>= protocol collapse</div>
  </div>
  
  <div style="width: 60px; text-align: center; padding: 0 15px; color: #9945FF;">
    <div style="font-size: 2em;">→</div>
  </div>
  
  <div class="problem-circle">
    <div style="font-size: 2.5em; font-weight: bold; color: #ff6666;">$10k+</div>
    <div style="font-size: 1em; padding: 0 10px;">drained in<br/>< 1 hour</div>
  </div>
</div>

### Why Existing Solutions Fail

<div class="columns">
<div>

- **GPS** → Spoofed
- **IP Address** → VPN bypass
- **QR Codes** → Shareable

</div>
<div>

- **Video Calls** → Deepfakes
- **Manual KYC** → Expensive & slow
- **Device ID** → Emulators

</div>
</div>

<div class="proof-box">
<strong>Our Solution:</strong> BLE Proximity = Cryptographic proof of physical co-location
</div>

<!--
SCRIPT (30 seconds):
"The attack: 1000 fake accounts, one fake merchant, drain everything in an hour.

Why alternatives fail: GPS spoofed. IP bypassed. QR screenshot. Video deepfaked. Manual KYC costs $50 - impossible for $2 loans.

BLE wins: Physical radio proximity - must be within 10 meters. Cryptographic signatures plus RSSI signal strength. Can't be faked remotely. Zero cost, 2 seconds.

Only solution that works."
-->

---

# Market + Proven Traction

<div class="stats-grid">
  <div class="stat-box">
    <div class="stat-value">2.5B</div>
    <div class="stat-label">Unbanked People</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">$380B</div>
    <div class="stat-label">Micro-Lending Market</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">215M</div>
    <div class="stat-label">Target: PH, KE, IN</div>
  </div>
</div>

### Proven on World Chain → Now on Solana

<div class="proof-box">
<strong>✅ World Chain Mainnet:</strong> 3 merchants | $12k+ disbursed | 85% repayment rate
</div>

<div class="proof-box">
<strong>✅ Hackathon MVP:</strong> Working demo | Complete Anchor program | All tests passing
</div>

<div class="columns">
<div>

**What We Proved:**

- Nano-lending works in Philippines
- Progressive credit system
- Merchant partnerships
- Real user demand

</div>
<div>

**Why Solana Now:**

- 100x cheaper transactions ($0.002)
- BLE + Solana Mobile Stack
- Stops bot farm attacks
- Ready to scale

</div>
</div>

<!--
SCRIPT (30 seconds):
"Market: 2.5 billion unbanked, $380 billion industry.

Already live on World Chain: 3 merchants, 85% repayment, $12k+ disbursed. Not a prototype.

Why Solana? Transactions 100x cheaper - $0.002 makes $2 loans viable. Solana Mobile Stack perfect for BLE + blockchain. And for this hackathon: we built the BLE proximity protocol that stops bot farms.

Proven model + anti-fraud security = ready to scale."
-->

---

# Vision: Scale Proven Model

<div class="timeline">
  <div class="timeline-item"><div class="timeline-dot"></div><div>Now<br/>3 merchants<br/>Philippines</div></div>
  <div class="timeline-item"><div class="timeline-dot"></div><div>6mo<br/>50 merchants<br/>Metro Manila</div></div>
  <div class="timeline-item"><div class="timeline-dot"></div><div>12mo<br/>500 merchants<br/>Major Cities</div></div>
  <div class="timeline-item"><div class="timeline-dot"></div><div>24mo<br/>Regional<br/>Expansion</div></div>
</div>

### Hackathon Deliverables

<div class="columns">
<div>

### 1. BLE Protocol ✅

- Ed25519 signatures
- RSSI verification
- Replay prevention

### 2. Smart Contract ✅

- Full verification logic
- All tests passing
- Production-ready

</div>
<div>

### 3. Working Demo ✅

- Real-time flow
- WebSocket simulation
- 7 screenshots in repo

### 🎯 Ready For

- **Grand Champion**
- **DeFi | Consumer Apps | Infrastructure**
- **Accelerator Program**

</div>
</div>

<!--
SCRIPT (40 seconds):
"Vision: 3 merchants now. 50 in 6 months. 500 in 12 months. Regional expansion follows.

Hackathon deliverables - all complete:

One: BLE proximity protocol. Ed25519 signatures, RSSI verification, replay prevention. Demo uses WebSockets - but the crypto, validation logic, and Anchor verification? Production-ready.

Two: Full Anchor smart contract. All tests passing.

Three: Working demo. 7 screenshots on GitHub.

Three tracks: DeFi - stop fraud. Consumer Apps - serve real users. Infrastructure - reusable proximity protocol.

This solves uncollateralized lending's critical problem. Thank you."
-->

---

# Team & Vision

<div class="columns">
<div>

### Alexander Schmitt - Founder

- ✅ Built & deployed live DeFi protocol
- ✅ Smart contracts + Mobile development
- ✅ Mercator Fellowship recipient

### Why This Matters

Witnessed microfinance challenges in Philippines - store owners can't access credit without collateral.

</div>
<div>

### Proven Track Record

**World Chain Mainnet:**

- Live with real merchants
- 85% repayment rate
- Real user validation

### Open to Collaboration

- Solana Mobile Stack experts
- Security auditors
- Solana Foundation partnership

</div>
</div>

<div class="proof-box" style="margin-top: 20px;">
<strong>Contact:</strong> alex@nanocredit.world
</div>

<!--
SCRIPT (20 seconds):
"I'm Alexander Schmitt. Built and deployed the live World Chain version. Smart contracts, mobile dev, DeFi experience.

Saw sari-sari stores in Philippines locked out of credit. Traditional banks require collateral. Bot farms break blockchain lending.

BLE proximity solves this. Open to collaboration - Solana Mobile experts, security auditors.

Let's bring DeFi to 2.5 billion people. Thank you."
-->
