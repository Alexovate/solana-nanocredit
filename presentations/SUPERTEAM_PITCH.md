---
marp: true
theme: default
paginate: true
backgroundColor: "#121212"
color: "#E0E0E0"
header: '<div style="text-align: right;"><span style="color: #14F195; font-weight: bold; font-size: 1em;">NanoCredit | Superteam Germany Cypherpunk 2025</span></div>'
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
      textColor: '#E0E0E0',
      fontSize: '16px'
    }
  });
</script>

<div class="intro">

# NanoCredit

<p class="tagline">BLE Proximity-Verified Nano-Loans<br/>Stopping Bot Farm Fraud in DeFi</p>

<div>
<span class="track-badge">Börse Stuttgart Track</span>
<span class="track-badge">Mansory Track</span>
</div>

</div>

<!--
SPEAKER NOTES (10s):
Hi, I'm Alexander from NanoCredit. We're building uncollateralized nano-lending for 2.5 billion unbanked people. The biggest challenge? Bot farms that can drain entire protocols. We solved this using Bluetooth proximity verification.
-->

---

# The Problem: 2.5B People vs Bot Farms

<div class="columns">
<div>

### 🌍 The Market

<div class="stat-box" style="margin-bottom: 1.5rem;">
<div class="stat-value">2.5B</div>
<div class="stat-label">People Need Nano-Loans</div>
</div>

<div class="stat-box">
<div class="stat-value">$380B</div>
<div class="stat-label">Market Size</div>
</div>

</div>
<div>

### 🚨 The Attack

<div class="problem-circle" style="margin-bottom: 1.5rem;">
<div style="font-size: 3em; font-weight: bold; color: #ff6666;">1,000</div>
<div style="font-size: 1.1em; padding: 0 10px;">fake accounts = dead protocol</div>
</div>

</div>
</div>

<div class="proof-box" style="margin-top: 2rem;">
<strong>Why All Alternatives Fail:</strong> GPS spoofed • QR screenshot • Video deepfaked • KYC too expensive
</div>

<!--
SPEAKER NOTES (25s):
Let me show you the dual problem we're solving. On one side, you have 2.5 billion people - low income workers in the Philippines who can't access even $2 in credit without collateral. That's a $380 billion market.

On the other side, you have bot farms. One operator with 1000 fake accounts can drain an entire lending protocol in under an hour.

Traditional solutions don't work here. GPS can be spoofed. QR codes get screenshot and shared. Video calls? Deepfaked. And manual KYC costs to much per user - you can't do that for $2 loans.
-->

---

# Our Solution: BLE Proximity + Live Demo

<div class="columns">
<div>

### The Flow

<div class="demo-step">
📱 Merchant broadcasts
</div>

<div class="demo-step">
🔍 Customer scans (-62 dBm = 5 meters)
</div>

<div class="demo-step">
🔐 Both sign cryptographically
</div>

<div class="demo-step">
⛓️ Verified on Solana
</div>

<div class="proof-box" style="margin-top: 1.5rem;">
<strong>Total Time:</strong> 5 seconds
</div>

</div>
<div>

### Architecture

<div class="mermaid" style="margin-bottom: 1.5rem;">
flowchart LR
    Customer[Customer] --> ProofGen[Proximity Proof]
    Merchant[Merchant] --> ProofGen
    ProofGen --> Anchor[Anchor Program]
    Anchor --> Loan[Loan Approved]
    style Customer fill:#9945FF,stroke:#9945FF,color:#FFFFFF
    style Merchant fill:#9945FF,stroke:#9945FF,color:#FFFFFF
    style ProofGen fill:#14F195,stroke:#14F195,color:#121212
    style Anchor fill:#14F195,stroke:#14F195,color:#121212
    style Loan fill:#14F195,stroke:#14F195,color:#121212
</div>

<div class="proof-box">
✅ Complete Anchor program
</div>

<div class="proof-box">
✅ Working demo on GitHub
</div>

</div>
</div>

<!--
SPEAKER NOTES (20s):
Here's how it works. Merchant broadcasts via Bluetooth. Customer scans, sees the merchant 5 meters away. Requests a $2 loan. Both phones sign the proximity proof - signal strength, timestamp, unique nonce. Goes to our Anchor program. Verified on-chain. Total: 5 seconds.

The architecture is simple. Both parties create a proximity proof. Anchor program verifies it. Loan approved. Done.
-->

---

# Proven + Ready to Scale

<div class="columns">
<div>

### ✅ Already Live

<div class="proof-box" style="margin-bottom: 1rem;">
<strong>85% repayment rate</strong> on World Chain mainnet
</div>

<div class="proof-box" style="margin-bottom: 1rem;">
Real merchants in Philippines
</div>

### 🔒 Why BLE Wins

<div class="proof-box" style="margin-bottom: 0.5rem;">
Radio physics can't be faked remotely
</div>

<div class="proof-box">
Bot farms must be physically present = impossible
</div>

</div>
<div>

### 🚀 Why Solana?

<div class="decision-box" style="margin-bottom: 1rem;">
<div class="decision-heading">⚡ 100x Cheaper</div>
$0.002 per transaction
</div>

<div class="decision-box" style="margin-bottom: 1rem;">
<div class="decision-heading">📱 Mobile Stack</div>
Built for BLE integration
</div>

### 🌍 Market: 2.5B People, $380B

<div style="background: rgba(20, 241, 149, 0.1); border: 2px solid #14F195; border-radius: 8px; padding: 20px; margin-top: 1rem; text-align: center;">
<div style="font-size: 1.5em; font-weight: bold; color: #14F195;">🇵🇭 Philippines | 🇰🇪 Kenya | 🇮🇳 India</div>
</div>

</div>
</div>

<!--
SPEAKER NOTES (25s):
We're already live on World Chain with 85% repayment rate. Nano-lending works when you stop bot farms.

How do we stop them? Radio physics. You can't fake Bluetooth proximity remotely. Bot farms must be physically there - impossible.

Why Solana? Transactions are 100x cheaper - $0.002 makes $2 loans viable. Plus the Mobile Stack is perfect for Bluetooth.

Market is 2.5 billion people, $380 billion industry. Starting with Philippines, Kenya, India.
-->

---

# Hackathon Complete → Ready to Scale

<div class="columns">
<div>

### ✅ What We Built

<div class="proof-box" style="margin-bottom: 1rem;">
Complete Anchor program (all tests passing)
</div>

<div class="proof-box" style="margin-bottom: 1rem;">
Working BLE proximity protocol
</div>

<div class="proof-box">
Demo on GitHub
</div>

</div>
<div>

### 🚀 Next: 10 Merchant Pilot

<div style="background: rgba(20, 241, 149, 0.15); border: 2px solid #14F195; border-radius: 8px; padding: 35px; margin-bottom: 1.5rem; text-align: center;">
<div style="font-size: 2.5em; font-weight: bold; color: #14F195; margin-bottom: 10px;">React Native</div>
<div style="font-size: 1.3em;">Solana Mobile Stack</div>
</div>

<div style="background: rgba(153, 69, 255, 0.1); border: 2px solid #9945FF; border-radius: 8px; padding: 20px; text-align: center;">
<div style="font-size: 1.3em; font-weight: bold; color: #9945FF;">Manila Launch Q1 2026</div>
</div>

</div>
</div>

<div style="text-align: center; margin-top: 2rem; padding: 1em; background: rgba(20, 241, 149, 0.1); border-radius: 8px; border: 2px solid #14F195;">
<div style="font-size: 1.5em; font-weight: 700; color: #14F195; margin-bottom: 0.5em;">Börse Stuttgart | Mansory Tracks</div>
<div style="font-size: 1.2em;">📧 alex@nanocredit.world | 💻 github.com/alexovate/solana-nanocredit</div>
</div>

<!--
SPEAKER NOTES (15s):
Hackathon deliverables: Complete Anchor program, all tests passing. Working BLE protocol. Demo on GitHub.

Next step: React Native app on Solana Mobile Stack. 10 merchant pilot launching in Manila Q1 2026.

Competing for Börse Stuttgart and Mansory tracks. Thank you!
-->

---

<!-- BACKUP SLIDE: Anti-Relay Defense -->

# 🛡️ BACKUP: Anti-Relay Defense

## How We Stop BLE Relay Attacks

<div class="columns">
<div>

### 🚨 The Relay Attack Threat

<div class="decision-box">
<div class="decision-heading">The Attack</div>
Bot farm operator uses two devices to relay BLE signals between fake customer (remote) and real merchant (physical location)
</div>

<div style="background: rgba(255, 102, 102, 0.15); border: 2px solid #ff6666; border-radius: 8px; padding: 20px; margin-top: 1rem; text-align: center;">
<div style="font-size: 2.5em; margin-bottom: 10px;">⚠️</div>
<div style="font-size: 1.3em; font-weight: bold; color: #ff6666;">Without protection: protocol breaks</div>
</div>

</div>
<div>

### 🛡️ Three-Layer Defense System

<div class="decision-box">
<div class="decision-heading">1️⃣ RSSI Latency Check</div>
Measure round-trip time - relay adds 50-200ms delay vs direct 1-5ms
</div>

<div class="decision-box">
<div class="decision-heading">2️⃣ Challenge-Response Protocol</div>
Random nonce must be signed within 100ms - relay can't meet timing
</div>

<div class="decision-box">
<div class="decision-heading">3️⃣ Signal Pattern Analysis</div>
Real BLE has natural RSSI fluctuation (±3-5 dBm) - relay is too stable
</div>

<div class="proof-box" style="margin-top: 1rem;">
<strong>Result:</strong> Relay attacks physically impossible without being detected
</div>

</div>
</div>

<!--
SPEAKER NOTES - BACKUP SLIDE (25s):
Great question about relay attacks. This is where a bot farm operator uses two devices - one near the merchant, one near the fake customer - to relay Bluetooth signals. Makes it look like they're close when they're not.

We have three layers of defense against this.

First, RSSI latency checking. A direct Bluetooth connection has 1-5 milliseconds round-trip time. A relay adds 50-200 milliseconds of delay. That's impossible to hide.

Second, challenge-response protocol. The random nonce must be signed within 100 milliseconds. A relay simply can't meet this timing requirement.

Third, signal pattern analysis. Real Bluetooth signals fluctuate naturally as you move - typically ±3-5 dBm. A relayed signal is too stable and consistent. We can detect that.

Result? Relay attacks become physically impossible without being detected. Once again, radio physics wins.
-->
