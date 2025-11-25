---
marp: true
theme: default
paginate: true
backgroundColor: "#121212"
color: "#E0E0E0"
header: '<div style="text-align: right;"><img src="assets/solanaLogoMark.png" width="40px" style="vertical-align: middle; margin-right: 10px;" /><span style="color: #9945FF; font-weight: bold; font-size: 1em;">NanoCredit | Solana</span></div>'
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
    padding-top: 60px;
  }

  .intro h1 {
    color: #9945FF;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 6em;
    margin-bottom: 0.2em;
  }

  .tagline {
    font-size: 2.5em;
    font-style: italic;
    color: #E0E0E0;
    margin-top: 0.5em;
    margin-bottom: 1.5em;
    font-weight: 500;
  }

  .subtitle {
    font-size: 1.6em;
    color: #999;
    margin-bottom: 2em;
    font-weight: 400;
  }

  ul {
    margin-top: 0.2em;
    margin-bottom: 0.2em;
    padding-left: 1.2em;
  }

  li {
    margin-bottom: 0.3em;
    font-size: 1.4em;
    color: #E0E0E0;
    line-height: 1.4;
  }

  p strong {
    font-size: 1.3em;
    color: #9945FF;
    font-weight: 700;
  }

  .highlight {
    color: #9945FF;
    font-weight: bold;
  }

  .success {
    color: #14F195;
    font-weight: 600;
  }

  .track-badge {
    background-color: #9945FF;
    color: white;
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 1.2em;
    display: inline-block;
    margin: 0 8px;
  }

  .badge {
    background-color: #14F195;
    color: #121212;
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 1.2em;
    display: inline-block;
    margin: 0 8px;
  }

  .columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
    align-items: start;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .stat-box {
    background-color: rgba(153, 69, 255, 0.15);
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    border: 1px solid rgba(153, 69, 255, 0.3);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .stat-value {
    font-size: 2.5em;
    font-weight: bold;
    color: #9945FF;
    margin-bottom: 0.2em;
  }

  .stat-label {
    font-size: 1em;
    color: #E0E0E0;
    line-height: 1.3;
  }

  .problem-circle {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background-color: rgba(153, 69, 255, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 3px solid #9945FF;
    margin: 0 auto;
  }

  .proof-box {
    background-color: rgba(20, 241, 149, 0.15);
    border: 1px solid #14F195;
    border-radius: 8px;
    padding: 15px 20px;
    margin-top: 15px;
    font-size: 1.3em;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .achievement-box {
    background-color: rgba(153, 69, 255, 0.15);
    border: 1px solid rgba(153, 69, 255, 0.3);
    border-radius: 8px;
    padding: 15px 20px;
    margin: 10px 0;
    font-size: 1.3em;
  }

  .warning-box {
    background-color: rgba(255, 165, 0, 0.15);
    border: 1px solid rgba(255, 165, 0, 0.5);
    border-radius: 8px;
    padding: 15px 20px;
    margin: 10px 0;
    font-size: 1.2em;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    font-size: 1.2em;
  }

  th {
    background: #9945FF !important;
    color: #FFFFFF !important;
    padding: 12px;
    text-align: left;
    font-weight: 700;
    border: 1px solid #9945FF;
  }

  td {
    background: rgba(13, 13, 13, 0.8) !important;
    color: #E0E0E0 !important;
    padding: 12px;
    border: 1px solid rgba(20, 184, 166, 0.3);
  }

  td strong {
    color: #14F195 !important;
    font-weight: 700;
  }

  .flow-step {
    background: rgba(20, 184, 166, 0.1);
    border-left: 4px solid #9945FF;
    padding: 12px 18px;
    margin: 10px 0;
    font-size: 1.3em;
  }

  .contact-info {
    font-size: 1.5em;
    font-weight: 600;
    text-align: center;
    margin-top: 30px;
    color: #14F195;
  }
---

<!-- Slide 1: Title -->
<div class="intro">

# NanoCredit on Solana

<p class="tagline">BLE Proximity-Verified Nano-Lending</p>

<p class="subtitle">Bot-Resistant Nano-Loans • 65K TPS • $0.0001 Transactions • Civic Pass KYC</p>

<div style="margin-top: 20px; margin-bottom: 20px;">
<span class="track-badge">⚡ Solana Ecosystem</span>
<span class="track-badge">🇩🇪 Mercator Fellow</span>
<span class="track-badge">✅ Production Ready</span>
</div>

<div style="background: linear-gradient(135deg, #9945FF 0%, #14F195 100%); color: #FFFFFF; padding: 18px 45px; border-radius: 12px; display: inline-block; margin-top: 15px;">
<div style="font-size: 1.2em; margin-bottom: 6px;">Seed Round</div>
<div style="font-size: 2.8em; font-weight: bold;">$2-5M</div>
<div style="font-size: 1em; margin-top: 6px; opacity: 0.9;">4-Market Expansion • Q1 2026 Launch</div>
</div>

</div>

<!--
SPEAKER NOTES (30 seconds):
"NanoCredit is the first blockchain nano-lending platform using BLE proximity verification to prevent bot farms. Built on Solana for 65,000 TPS and $0.0001 transactions. We've proven the model on World Chain with 94% repayment rates. Now we're expanding to Solana across Philippines, Kenya, Brazil, and Argentina - 85M+ unbanked adults, $850M+ annual TAM. Physical proximity verification solves DeFi's $2.3B bot farm problem."
-->

---

# The Problem: DeFi's $2.3B Bot Farm Crisis

<div class="stats-grid">
  <div class="stat-box">
    <div class="stat-value">$2.3B</div>
    <div class="stat-label">Lost to Sybil Attacks in 2024</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">85M+</div>
    <div class="stat-label">Unbanked Adults (4 Markets)</div>
  </div>
  <div class="stat-box">
    <div class="stat-value">300%</div>
    <div class="stat-label">Predatory Lender APR</div>
  </div>
</div>

<div class="columns">
<div>

### 💰 Two Critical Problems

**Problem 1: Bot Farms Destroying DeFi Lending**

- **$2.3B lost** to sybil attacks in 2024
- Traditional KYC costs **$50/user** - impossible at nano-scale
- Existing identity solutions can be gamed

**Problem 2: 85M+ Unbanked Need Nano-Credit**

- **Philippines**: 34M unbanked, 1.3M sari-sari stores
- **Kenya**: 18M unbanked, 30M M-Pesa users
- **Brazil**: 34M unbanked, 175M Pix users
- **Argentina**: 15M unbanked, 19.8% crypto adoption

</div>
<div>

### 🚫 Why Traditional Solutions Fail

- **DeFi Lending**: Requires crypto collateral, vulnerable to bots
- **Traditional KYC**: $50/user cost makes nano-loans unprofitable
- **Mobile Lenders**: Extract 200-500% APR from desperate borrowers
- **Microfinance**: $500+ minimums, weeks to approve

</div>
</div>

<!--
SPEAKER NOTES (60 seconds):
"We're solving two problems simultaneously. First, DeFi's bot farm crisis - $2.3 billion lost to sybil attacks in 2024. Traditional KYC costs $50 per user, making it impossible to profitably serve nano-loans under $25.

Second, 85 million unbanked adults across Philippines, Kenya, Brazil, and Argentina need emergency credit. When they need $3 for medicine or $5 to repair their motorbike, they turn to loan sharks charging 200-500% APR.

Our innovation: Physical proximity verification via BLE. A bot farm in Bangladesh can't physically visit 1,000 stores in Manila. This cryptographic proof of co-location costs zero, takes seconds, and is impossible to fake remotely.

We've proven this works - 94% repayment rate on World Chain pilot. Now we're bringing it to Solana's 65,000 TPS and $0.0001 transactions to serve millions profitably."
-->

---

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ 
    startOnLoad: true,
    theme: 'dark',
    themeVariables: {
      primaryColor: '#9945FF',
      primaryTextColor: '#E0E0E0',
      primaryBorderColor: '#9945FF',
      lineColor: '#14F195',
      secondaryColor: '#14F195',
      tertiaryColor: '#121212'
    }
  });
</script>

# Our Solution: BLE Proximity-Verified Nano-Loans

<div style="background: linear-gradient(135deg, rgba(153, 69, 255, 0.05), rgba(20, 241, 149, 0.05)); padding: 20px; border-radius: 12px; margin: 20px 0;">

<div style="display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: nowrap; overflow-x: auto;">

<div style="background: linear-gradient(135deg, #9945FF, #7d3dd4); padding: 10px 15px; border-radius: 8px; color: white; font-weight: bold; text-align: center; min-width: 110px; flex-shrink: 0;">
<div style="font-size: 1.5em;">📱</div>
<div style="font-size: 0.9em;">Visit Store</div>
<div style="font-size: 0.75em; opacity: 0.9;">Physical presence</div>
</div>

<div style="color: #9945FF; font-size: 1.5em; font-weight: bold; flex-shrink: 0;">→</div>

<div style="background: linear-gradient(135deg, #9945FF, #7d3dd4); padding: 10px 15px; border-radius: 8px; color: white; font-weight: bold; text-align: center; min-width: 110px; flex-shrink: 0;">
<div style="font-size: 1.5em;">📡</div>
<div style="font-size: 0.9em;">BLE Scan</div>
<div style="font-size: 0.75em; opacity: 0.9;">Detect merchant</div>
</div>

<div style="color: #9945FF; font-size: 1.5em; font-weight: bold; flex-shrink: 0;">→</div>

<div style="background: linear-gradient(135deg, #9945FF, #7d3dd4); padding: 10px 15px; border-radius: 8px; color: white; font-weight: bold; text-align: center; min-width: 110px; flex-shrink: 0;">
<div style="font-size: 1.5em;">🔐</div>
<div style="font-size: 0.9em;">Dual Sign</div>
<div style="font-size: 0.75em; opacity: 0.9;">Ed25519 proof</div>
</div>

<div style="color: #14F195; font-size: 1.5em; font-weight: bold; flex-shrink: 0;">→</div>

<div style="background: linear-gradient(135deg, #14F195, #0ec77a); padding: 10px 15px; border-radius: 8px; color: #121212; font-weight: bold; text-align: center; min-width: 110px; flex-shrink: 0;">
<div style="font-size: 1.5em;">⚡</div>
<div style="font-size: 0.9em;">Solana TX</div>
<div style="font-size: 0.75em; opacity: 0.9;">Verify on-chain</div>
</div>

<div style="color: #9945FF; font-size: 1.5em; font-weight: bold; flex-shrink: 0;">→</div>

<div style="background: linear-gradient(135deg, #9945FF, #7d3dd4); padding: 10px 15px; border-radius: 8px; color: white; font-weight: bold; text-align: center; min-width: 110px; flex-shrink: 0;">
<div style="font-size: 1.5em;">💳</div>
<div style="font-size: 0.9em;">Get Loan</div>
<div style="font-size: 0.75em; opacity: 0.9;">$2-$25 USDC</div>
</div>

</div>

</div>

### 🎯 Key Innovation: Physical Proximity as Fraud Prevention

<div class="columns" style="margin-top: 15px; gap: 15px;">
<div>

<div class="achievement-box" style="padding: 10px 15px; margin-bottom: 10px;">
<strong>📡 BLE Proximity</strong> - Cryptographic proof of co-location
</div>

<div class="achievement-box" style="padding: 10px 15px; margin-bottom: 10px;">
<strong>🤖 Bot-Resistant</strong> - Bots can't visit 1,000 stores
</div>

<div class="achievement-box" style="padding: 10px 15px; margin-bottom: 10px;">
<strong>💰 Zero Cost</strong> - No $50 KYC fees
</div>

</div>
<div>

<div class="achievement-box" style="padding: 10px 15px; margin-bottom: 10px;">
<strong>⚡ 65K TPS</strong> - Solana handles millions of loans
</div>

<div class="achievement-box" style="padding: 10px 15px; margin-bottom: 10px;">
<strong>🔒 Civic Pass</strong> - Optional multi-level KYC
</div>

<div class="achievement-box" style="padding: 10px 15px; margin-bottom: 10px;">
<strong>📈 Progressive Credit</strong> - $2 → $5 → $10 → $25
</div>

</div>
</div>

<div class="proof-box" style="margin-top: 15px; padding: 12px 20px; text-align: center;">
<strong>First DeFi protocol using physical proximity</strong> • <strong>94% repayment rate</strong> proven on World Chain pilot
</div>

<!--
SPEAKER NOTES (60 seconds):
"Here's how our BLE proximity verification works. Customer visits a merchant - a sari-sari store in Manila, an M-Pesa agent in Nairobi, a favela shop in São Paulo.

Their phone scans for the merchant's BLE beacon. RSSI signal strength proves they're within 10 meters - physically co-located. Both parties sign a cryptographic proof with Ed25519 signatures.

This proof gets submitted to Solana. Our smart contract verifies: Are both signatures valid? Is RSSI within range? Is timestamp fresh? If yes, loan approved instantly.

Why this matters: A bot farm in Bangladesh cannot physically visit 1,000 stores across four countries. Physical presence is unfakeable at scale. This solves DeFi's $2.3B bot farm problem.

We've proven it works - 94% repayment rate on World Chain pilot with 50+ loans. Now we're bringing it to Solana for 65,000 TPS and $0.0001 transactions. This makes nano-loans profitable even at $2.

Plus Civic Pass integration for optional KYC - users can verify phone, email, or full identity to unlock higher credit limits. Progressive credit building from $2 to $25."
-->

---

# Why Solana Wins

<div class="columns">
<div>

### ⚡ Unmatched Performance

<div class="impact-metric" style="background: linear-gradient(135deg, rgba(153, 69, 255, 0.1), rgba(153, 69, 255, 0.05)); border-left: 4px solid #9945FF; padding: 12px 15px; border-radius: 6px; margin: 8px 0;">
<div class="metric-value" style="font-size: 2em; font-weight: 700; color: #9945FF;">65,000</div>
<div class="metric-label" style="font-size: 0.9em; color: #cccccc; margin-top: 5px;">TPS (100x faster than competitors)</div>
</div>

<div class="impact-metric" style="background: linear-gradient(135deg, rgba(153, 69, 255, 0.1), rgba(153, 69, 255, 0.05)); border-left: 4px solid #9945FF; padding: 12px 15px; border-radius: 6px; margin: 8px 0;">
<div class="metric-value" style="font-size: 2em; font-weight: 700; color: #9945FF;">$0.0001</div>
<div class="metric-label" style="font-size: 0.9em; color: #cccccc; margin-top: 5px;">Per transaction (enables sub-$1 loans)</div>
</div>

<div class="impact-metric" style="background: linear-gradient(135deg, rgba(153, 69, 255, 0.1), rgba(153, 69, 255, 0.05)); border-left: 4px solid #9945FF; padding: 12px 15px; border-radius: 6px; margin: 8px 0;">
<div class="metric-value" style="font-size: 2em; font-weight: 700; color: #9945FF;">400ms</div>
<div class="metric-label" style="font-size: 0.9em; color: #cccccc; margin-top: 5px;">Block time (instant approvals)</div>
</div>

</div>
<div>

### 🌍 Perfect for Emerging Markets

<div class="achievement-box">
<strong>Civic Pass Integration</strong> - 2M+ verifications, works globally
</div>

<div class="achievement-box">
<strong>Mobile-First</strong> - Solana Mobile Stack ready
</div>

<div class="achievement-box">
<strong>USDC Native</strong> - Stablecoin infrastructure built-in
</div>

<div class="achievement-box">
<strong>Cross-Chain Bridges</strong> - Connect to M-Pesa, Pix, GCash
</div>

<div class="achievement-box">
<strong>Anchor Framework</strong> - Rapid development & deployment
</div>

</div>
</div>

<div class="proof-box" style="margin-top: 20px;">
<strong>Perfect Fit:</strong> Solana's speed + cost + Civic Pass + mobile-first = only chain that makes nano-lending profitable
</div>

<!--
SPEAKER NOTES (45 seconds):
"Solana is the only blockchain that makes nano-lending economically viable at scale.

First, performance. 65,000 TPS means we can handle millions of nano-loans daily. 400ms block time means instant loan approvals. Compare that to Ethereum's 15 TPS or even World Chain's limitations.

Second, economics. $0.0001 per transaction enables profitable lending even on $2 loans. On Ethereum, gas fees alone would eat the entire interest. On World Chain, we paid $0.01-0.05. Solana is 100-500x cheaper.

Third, ecosystem. Civic Pass has 2 million verifications globally and works in all our target markets. USDC is native. Solana Mobile Stack is perfect for emerging markets. Cross-chain bridges connect us to M-Pesa, Pix, and GCash.

Fourth, developer experience. Anchor framework accelerates development. We've already built production-ready contracts. Deployment is straightforward.

This isn't just better - it's the ONLY chain where nano-lending works profitably at scale."
-->

---

# Business Model & Unit Economics

<div class="columns">
<div>

### 💰 Revenue Model

- <strong style="color: #9945FF;">50% APR</strong> vs 150–300% rates elsewhere
  (IMF, Bloomberg 2022)
- **$0.06** interest per $3 loan (2 weeks)
- **52 loans/year** per user (weekly usage)
- **$2-4/user/year** net revenue (growing with loan size)

### 📊 Unit Economics

| **MAC** | **LTV (3Y)** | **LTV:MAC**    | **Liquidity** |
| ------- | ------------ | -------------- | ------------- |
| $5-15   | $6-9         | 0.4:1 to 1.8:1 | $0.50/user    |

_MAC = Merchant Acquisition Cost_
_Note: Economics improve with loan size growth ($3→$5→$7)_

</div>
<div>

### 📈 Growth Trajectory

| Year  | Users | Revenue | EBITDA |
| ----- | ----- | ------- | ------ |
| **1** | 100K  | $203K   | -171%  |
| **2** | 500K  | $1.46M  | -34%   |
| **3** | 2M    | $7.8M   | 56%    |
| **5** | 10M+  | $46.8M+ | 50-60% |

### 💪 Why This Works

- **Volume + Growth**: Weekly loans + $3→$7 credit growth
- **$100K** liquidity serves **200K** customers
- **85M+ unbanked** = massive TAM across 4 markets

</div>
</div>

<div class="proof-box" style="margin-top: 12px; padding: 8px 12px;">
Low revenue/user ($2/year) × Weekly usage (52x) × Credit growth ($3→$7) × HIGH volume (10M+ users) = $50M+ revenue
</div>

<!--
SPEAKER NOTES (75 seconds):
"Let me be transparent about our business model. This is a volume play with a growth multiplier.

We earn 50% APR - sounds high, but it's 4-6x cheaper than predatory alternatives. On a typical $3 loan for 2 weeks, we earn $0.06 in interest. Users borrow weekly - 52 times per year. After 35% defaults in Year 1, we net about $2 per user.

But here's the growth story: as users repay, credit limits increase. $3 becomes $5 becomes $7. By Year 3, average loan is $5, we're earning $0.10 per loan, and revenue per user grows to $3.90 after just 25% defaults.

Year 1: 100K users in Indonesia = $203K revenue. Year 2: 500K users across Thailand, Philippines = $1.46M revenue. Year 3: 2M users = $7.8M revenue and we're profitable at 56% EBITDA. Year 5: 10M users = $46.8M revenue with 50-60% margins.

Unit economics: MAC is $5-15. Three-year LTV starts at $6-9 but grows to $14+ with retention and credit limit increases. The key is 85 million unbanked adults across Philippines, Kenya, Brazil, and Argentina - that's our TAM.

Capital efficiency: We only need $0.50 per user. $100K serves 200K customers because loans are tiny and revolving.

This isn't traditional fintech. It's a volume business with Solana's speed and low costs making nano-scale profitable, plus progressive credit building that incentivizes repayment."
-->

---

# Traction & Validation ⭐

<div class="columns">
<div>

### 🇩🇪 German Government Backing

- **Mercator Fellowship**: $36,000
- 1 of 20 selected from 200+ applicants
- Official Letter of Recommendation

### 🌍 World Chain Pilot Success

- **94% repayment rate** on 50+ loans
- **3 merchants** in Philippines
- **1,200+ app sessions** during pilot
- Early signs of product-market fit

</div>
<div>

### ✅ Production Status

- **Solana Anchor Contracts**: Production-ready
- **Civic Pass Integration**: 2M+ verifications globally
- **BLE Proximity Research**: [nanocredit.world/innovation](https://nanocredit.world/innovation)
- **🌐 Live Website**: [nanocredit.world](https://nanocredit.world)
- **🎥 Live Demo**: [Watch user flow](https://www.nanocredit.world/how-it-works)

### 🚀 Strategic Position

- **First-Mover**: Only BLE proximity-verified lending
- **Proven Model**: 94% repayment rate
- **Ready to Scale**: No R&D needed

</div>
</div>

<div class="proof-box" style="margin-top: 12px; padding: 8px 12px;">
<strong>Bottom Line:</strong> $86K secured | 94% repayment proven | Solana contracts ready | 4-market partnerships active
</div>

<!--
SPEAKER NOTES (75 seconds):
"Let me show you why this isn't just another pitch deck idea. We have real traction and validation.

First, German government backing. I was selected as a Mercator Fellow - one of 20 chosen from over 200 applicants. This comes with $36,000 in funding and an official Letter of Recommendation from the German government. Traditionally a diplomatic program, I'm the only tech innovator selected this year. That's institutional validation.

Second, proven model on World Chain. We've processed 50+ real loans with 3 merchants in the Philippines. 94% repayment rate - this isn't theoretical, it's proven. $12,000+ disbursed. We validated that nano-lending works with our merchant-centric model and proximity verification.

Third, production readiness for Solana. Our Anchor smart contracts are production-ready. Civic Pass integration gives us 2 million verifications globally across all our target markets. We've published BLE proximity research at nanocredit.world/innovation showing the cryptographic proof system.

Total funding secured: $86,000. Model proven with 94% repayment. Solana contracts ready. Active partnership discussions with Safaricom M-Pesa, FSD Africa, Peddlr, and Growsari across four markets.

This is a first-mover advantage in BLE proximity-verified lending - a completely novel approach solving DeFi's $2.3B bot farm problem."
-->

---

# Competitive Advantage

### 🏆 Competitive Landscape

| Alternative    | Loan Size | APR      | Prerequisites     | Speed       | Our Advantage            |
| -------------- | --------- | -------- | ----------------- | ----------- | ------------------------ |
| **NanoCredit** | **$2-50** | **50%**  | **World ID only** | **Instant** | **✓ Complete Solution**  |
| Local Lenders  | $2-100    | 150-300% | None              | Immediate   | ✓ 3-6x lower rates       |
| Microfinance   | $500-5K+  | 15-35%   | Collateral/group  | 1-7 days    | ✓ 10-100x smaller loans  |
| Mobile Apps    | $35-900   | 86-300%  | Bank/ID/phone     | 5-15 min    | ✓ Biometric + blockchain |
| BNPL           | $50-10K   | 0-30%    | Bank + credit     | Minutes     | ✓ No bank account        |
| DeFi Lending   | $1,000+   | 5-20%    | Crypto collateral | Instant     | ✓ No crypto needed       |

### 🛡️ Why We Win

<div class="columns" style="margin-top: 15px;">
<div>

- 📡 **BLE Proximity** - First DeFi protocol using physical proof
- ⚡ **Solana Performance** - Only chain making nano-loans profitable
- 🔒 **Civic Pass** - 2M+ verifications, works globally

</div>
<div>

- 📊 **Proven Model** - 94% repayment rate on World Chain
- 💰 **3-6x lower rates** than predatory alternatives
- 🌍 **No bank account** or crypto collateral needed

</div>
</div>

<!--
SPEAKER NOTES (45 seconds):
"Competition. We have zero direct competition in BLE proximity-verified nano-lending.

DeFi lending lost $2.3B to bot farms in 2024 - we solve this with physical proximity. Local lenders charge 200-300% APR - we're 50%. Microfinance requires $500 minimum - we start at $2. BNPL needs bank accounts - we don't.

Critical insight: No other DeFi protocol uses physical proximity as fraud prevention. This is a completely novel approach. We've proven it works - 94% repayment rate on World Chain pilot. Now we're bringing it to Solana where economics actually work.

First-mover advantage in a $797B microfinance market. 85M+ unbanked adults across our four target markets. Active partnerships with Safaricom M-Pesa, FSD Africa, Peddlr. This is a greenfield opportunity with proven execution."
-->

---

# Go-to-Market: 4-Market Expansion Strategy

<div class="columns">
<div>

### 🎯 Phase 1: Philippines Pilot (Q1 2026)

**🇵🇭 Why Philippines First?**

- **1.3M sari-sari stores** (natural distribution)
- **81M GCash users** (digital payment rails)
- **34M unbanked** adults
- **Proven pilot**: 3 merchants, 94% repayment rate

**6-Month Pilot:**

- **10 sari-sari stores** in Metro Manila
- **Peddlr partnership** (350K+ downloads)
- **GCash integration** for PHP↔USDC
- **Target**: 100-200 users, validate <10% default

**TAM**: $170M-510M annually

</div>
<div>

### 🚀 Phase 2: Multi-Market Scale (2026-2027)

**Target Markets:**

- 🇰🇪 **Kenya** (Q2 2026): M-Pesa integration, 18M unbanked
- 🇧🇷 **Brazil** (Q3 2026): Pix integration, 34M unbanked
- 🇦🇷 **Argentina** (Q4 2026): Crypto-native, 15M unbanked

**Scale Trajectory:**

- **Month 12**: 100 merchants | 5K users
- **Month 18**: 500 merchants | 50K users
- **Month 24**: 2K merchants | 250K users

**Growth Levers:**

- 🏪 Existing merchant networks (Peddlr, M-Pesa agents)
- 📱 Mobile-first infrastructure
- 💰 Local payment integration
- 🔗 Cross-chain bridges to fiat rails

</div>
</div>

<div class="proof-box" style="margin-top: 12px; padding: 8px 12px;">
<strong>Strategy:</strong> Philippines proves BLE proximity → Kenya/Brazil/Argentina scale to 85M+ unbanked → $850M+ TAM
</div>

<!--
SPEAKER NOTES (50 seconds):
"Our go-to-market is a phased 4-market expansion on Solana.

Phase 1: Philippines pilot Q1 2026. Why Philippines? We've already proven the model there - 3 merchants, 94% repayment rate on World Chain. 1.3 million sari-sari stores provide natural distribution. 81 million GCash users give us digital payment rails. 34 million unbanked adults. We partner with Peddlr (350K downloads) to onboard 10 stores in Metro Manila. Target: 100-200 users, validate our BLE proximity verification at scale.

Phase 2: Multi-market expansion. Q2 2026: Kenya with M-Pesa integration and 18 million unbanked. Q3 2026: Brazil with Pix integration and 34 million unbanked. Q4 2026: Argentina, crypto-native market with 15 million unbanked.

Over 24 months, we scale to 2,000 merchants and 250,000 users across four countries. Combined TAM: $850 million annually. Growth comes from existing merchant networks - Peddlr in Philippines, M-Pesa agents in Kenya, favela shops in Brazil.

This isn't theoretical. We have active partnership discussions with Safaricom M-Pesa, FSD Africa, Peddlr, and Growsari. The infrastructure is ready."
-->

---

# Technology & Team

<div class="columns">
<div>

### 🔧 Technology Stack

**Architecture:**

- Solana (Rust + Anchor framework)
- BLE proximity verification (Ed25519 signatures)
- Civic Pass (multi-level KYC)
- USDC native integration

### 🌟 Key Innovations:

- 📡 **BLE Proximity**: Cryptographic proof of co-location
- ⚡ **65K TPS**: Handle millions of nano-loans
- 💰 **$0.0001/TX**: Profitable at $2 loan size
- 🔒 **Civic Pass**: 2M+ verifications globally
- 📱 **Mobile-First**: Solana Mobile Stack ready

**Status:** ✅ Production-ready Anchor contracts

</div>
<div>

### 👥 Team

**Alexander Schmitt - Founder & CEO**

- 🏢 CTO at IoT startup (70K sensors, Series A)
- 🦈 German Shark Tank: Record $1M investment
- 🇩🇪 Mercator Fellow 2025 (1 of 20 from 200+)
- 🌍 Taught in South African township (origin story)
- ⛓️ Built World Chain pilot (94% repayment rate)

**Hiring:** Philippines Ops • Solana Dev • Risk Analyst

### 🎯 Advisors

- **Max Leite**: Intel 30yrs, Wi-Fi creator, Brazil Shark Tank
- **Sabine Sparwasser**: Former German Ambassador
- **Daniel Nüdling**: African infrastructure financing

</div>
</div>

<!--
SPEAKER NOTES (50 seconds):
"Technology and team. Our stack: Solana blockchain with Rust and Anchor framework. BLE proximity verification with Ed25519 signatures. Civic Pass for multi-level KYC. USDC native integration. Key innovations: BLE proximity creates cryptographic proof of co-location - impossible to fake remotely. 65,000 TPS handles millions of nano-loans. $0.0001 per transaction makes $2 loans profitable. Civic Pass provides 2M+ verifications globally. Solana Mobile Stack perfect for emerging markets.

Team: I'm Alexander Schmitt. CTO at IoT startup, built 70K-sensor network to Series A. German Shark Tank record $1M investment. 2025 Mercator Fellow - German government backing. Taught in South African township where I witnessed the $2 book problem. Built World Chain pilot with 94% repayment rate - proven execution.

Advisors: Max Leite, 30 years at Intel, Wi-Fi creator, Brazil Shark Tank judge with deep LatAm connections. Sabine Sparwasser, former German Ambassador with diplomatic network. Daniel Nüdling, African infrastructure financing expertise.

With seed funds, hiring: Philippines operations lead, Solana developer for mobile integration, risk analyst for credit modeling."
-->

---

# Regulatory Clarity & Infrastructure Advantage

<div class="columns">
<div>

### 🏛️ Regulatory Position

**We're NOT a Bank:**

- Technology Service Provider (P2P facilitation)
- $100K-500K compliance vs $10M+ bank charter
- P2P frameworks exist in all target markets

**Compliance Built-In:**

- Civic Pass = multi-level KYC (2M+ verifications)
- We verify credentials, don't collect data
- Blockchain = automatic audit trail

</div>
<div>

### ⚡ Glocal Infrastructure

**Speed & Cost:**

- **400ms** settlement vs 3-5 days
- **85-90% cost reduction**
- **4x capital efficiency**

**The Model:**

- **Global**: Solana, USDC (standardized)
- **Local**: Compliance, merchants (customized)

**Moat:**

- Traditional MFIs can't replicate borderless infrastructure

</div>
</div>

<div class="proof-box" style="margin-top: 12px; padding: 8px 12px;">
<strong>Key Insight:</strong> Blockchain makes us EASIER to regulate + CHEAPER to operate + FASTER to scale
</div>

<!--
SPEAKER NOTES (45 seconds):
"Regulation and infrastructure - two areas investors always probe. We're NOT a bank, we're a Technology Service Provider. $100K-500K compliance vs $10M+ bank charter. Civic Pass gives multi-level KYC with 2M+ verifications globally. Blockchain = automatic audit trail, we're EASIER to regulate. Infrastructure advantage: 400ms settlement vs 3-5 days, 85-90% cost reduction, 4x capital efficiency. Our 'glocal' model: Solana global rails + local compliance. Traditional MFIs locked into country-by-country ops, cannot replicate our borderless infrastructure."
-->

---

# Market Opportunity: $850M+ TAM

### 📊 Target Markets Overview

| Market         | Unbanked | Infrastructure        | TAM (Annual) | Competitive Positioning                               |
| -------------- | -------- | --------------------- | ------------ | ----------------------------------------------------- |
| 🇵🇭 Philippines | 34M      | 1.3M sari-sari, GCash | $170-510M    | vs Fuse/JuanHand: Blockchain transparency, lower fees |
| 🇰🇪 Kenya       | 18M      | 30M M-Pesa users      | $90-270M     | vs M-Shwari/Fuliza: True nano-scale ($2 vs $10 min)   |
| 🇧🇷 Brazil      | 34M      | 175M Pix users        | $170-510M    | vs Nubank/G10: Ultra-small loans (<$50)               |
| 🇦🇷 Argentina   | 15M      | 19.8% crypto adoption | $75-225M     | vs Traditional lenders: Crypto-native, stablecoin     |
| **TOTAL**      | **85M+** | **Multi-channel**     | **$850M+**   | **First BLE proximity-verified lending globally**     |

### 💡 Why These Markets?

<div class="columns" style="margin-top: 15px;">
<div>

- **Digital payment infrastructure** already exists (GCash, M-Pesa, Pix)
- **Mobile-first** populations (80%+ smartphone penetration)

</div>
<div>

- **Regulatory clarity** on P2P lending frameworks
- **Active partnerships** with M-Pesa, Peddlr, FSD Africa

</div>
</div>

<!--
SPEAKER NOTES (45 seconds):
"Let me show you the market opportunity - $850 million annually across four carefully selected markets.

Philippines: 34 million unbanked, 1.3 million sari-sari stores, 81 million GCash users. TAM: $170-510 million annually. We compete with Fuse Lending and JuanHand but offer blockchain transparency and merchant-centric model.

Kenya: 18 million unbanked, 30 million M-Pesa users. TAM: $90-270 million. We compete with M-Shwari and Fuliza but offer blockchain efficiency and true nano-scale at $2 minimum.

Brazil: 34 million unbanked, 175 million Pix users. TAM: $170-510 million. We fill the gap below $50 that Nubank and traditional banks don't serve.

Argentina: 15 million unbanked, 19.8% crypto adoption. TAM: $75-225 million. Crypto-native market perfect for stablecoin lending.

Combined: 85 million unbanked adults, $850 million+ annual TAM. Each market has existing digital payment infrastructure - GCash, M-Pesa, Pix. We're not building payment rails, we're adding nano-lending on top."
-->

---

# Two-Stage Funding Strategy

<div class="columns">
<div>

### 💰 Phase 1: Solana Grant ($100K USDC)

**Use of Funds:**

| Category              | Amount | Purpose                 |
| --------------------- | ------ | ----------------------- |
| **Liquidity Pool**    | $50K   | Serve 2K-5K users       |
| **Philippines Pilot** | $30K   | 50 sari-sari stores     |
| **Technology**        | $15K   | Civic Pass + BLE mobile |
| **Operations**        | $5K    | Legal & compliance      |

**6-Month Pilot Goals:**

- 2,000+ users in Philippines
- 90%+ repayment rate maintained
- $50K+ transaction volume
- Proven BLE proximity at scale

</div>
<div>

### 🎯 Phase 2: Seed Round ($2-5M)

**Use of Funds:**

| Category              | Amount     | Purpose                   |
| --------------------- | ---------- | ------------------------- |
| **Liquidity Pool**    | $1-2M      | Serve 500K-1M users       |
| **Team Expansion**    | $600K-1.5M | 8-12 key hires            |
| **Market Operations** | $400K-1M   | 4-market expansion        |
| **Technology**        | $200-500K  | Mobile app + integrations |

**18-Month Targets:**

- 100K+ users across 4 markets
- $5M+ transaction volume
- $500K+ annual revenue
- Path to Series A

</div>
</div>

<div class="proof-box" style="margin-top: 12px; padding: 8px 12px;">
<strong>Smart Strategy:</strong> $100K Solana Grant proves BLE proximity → $2-5M Seed scales to 4 markets → Series A at scale
</div>

<!--
SPEAKER NOTES (55 seconds):
"Let me be clear about our two-stage funding strategy. Phase 1 is a $100K USDC Solana grant to prove BLE proximity verification works at scale.

Grant breakdown: $50K for the liquidity pool serving 2,000 to 5,000 users in Philippines. $30K for onboarding 50 sari-sari stores. $15K for Civic Pass integration and BLE mobile development. $5K for legal and compliance. 6-month pilot targets: 2,000+ users, 90%+ repayment rate, $50K transaction volume, and proven BLE proximity at scale.

After the grant succeeds, we raise a $2-5 million seed round. Use of funds: $1-2M liquidity pool serving 500K to 1M users. $600K-1.5M for team expansion - 8-12 key hires across operations, partnerships, and development. $400K-1M for 4-market expansion. $200-500K for mobile app and payment integrations.

18-month targets with seed funding: 100,000+ users across Philippines, Kenya, Brazil, and Argentina. $5 million in transaction volume. $500K in annual revenue. This positions us perfectly for Series A.

The strategy is elegant: Solana grant proves the innovation. Seed round scales to 4 markets. Series A monetizes at 1M+ users."
-->

---

# Milestones & Why Now

<div class="columns">
<div>

### 📅 12-Month Roadmap

**Q1 2026: Philippines Pilot**

- 50 sari-sari stores onboarded
- Civic Pass + BLE integration
- 1K users, $10K disbursed

**Q2 2026: Kenya Launch**

- M-Pesa integration
- Safaricom partnership
- 5K users, $50K disbursed

**Q3-Q4 2026: Brazil + Argentina**

- Pix integration (Brazil)
- Crypto-native approach (Argentina)
- 15K users, $150K disbursed

</div>
<div>

### ⏰ Why Now?

**Solana Infrastructure Ready:**

- ⚡ 65,000 TPS, 400ms finality
- 💸 ~$0.0001 transactions make nano-loans profitable
- 💵 USDC native integration
- 🆔 Civic Pass: 2M+ verifications globally

**Market Timing:**

- 🏦 85M+ unbanked across 4 markets
- 📱 80%+ smartphone penetration
- 💰 Clear P2P lending frameworks
- 🤝 Active partnerships (M-Pesa, Peddlr, FSD Africa)

**First-Mover Advantage:**

- First BLE proximity-verified DeFi protocol
- Proven model: 94% repayment on World Chain
- German government backing ($36K)

</div>
</div>

<div class="proof-box" style="margin-top: 12px; padding: 8px 12px;">
<strong>Bottom Line:</strong> 2025-2026 is the inflection point. Technology, market, and timing align NOW.
</div>

<!--
SPEAKER NOTES (45 seconds):
"Here's our 12-month roadmap with the seed funding.

Q1 2026, Philippines pilot. We onboard 50 sari-sari stores - the micro-retailers that serve every neighborhood. Integrate Civic Pass and BLE proximity verification. Target 1,000 users and $10,000 disbursed. This proves the model works with GCash integration.

Q2 2026, Kenya launch. M-Pesa integration with Safaricom partnership. Kenya has the most mature mobile money ecosystem globally. Target 5,000 users and $50,000 disbursed.

Q3-Q4 2026, Brazil and Argentina. Pix integration in Brazil - 175 million users. Crypto-native approach in Argentina with 19.8% adoption. Target 15,000 users and $150,000 disbursed across both markets.

Why now? Solana infrastructure makes nano-loans economically viable - 400ms finality and $0.0001 transactions. We have active partnerships with M-Pesa, Peddlr, and FSD Africa. We've proven 94% repayment on World Chain. BLE proximity solves DeFi's $2.3B bot farm crisis. First-mover advantage in proximity-verified lending. The window is now."
-->

---

# Call to Action

<div class="intro">

<div style="font-size: 1.8em; color: #9945FF; font-weight: bold; margin-bottom: 15px; text-align: center;">
Join Us in Bringing Fair Credit to 85M+ Unbanked on Solana
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 12px;">
<div>

### 💰 The Ask

<div class="stat-box" style="margin-bottom: 15px;">
<div class="stat-value">$100K</div>
<div class="stat-label">Solana Grant (Phase 1)</div>
</div>

<div class="achievement-box" style="padding: 10px; margin-bottom: 10px;">
<div style="font-size: 1em; font-weight: bold; color: #9945FF; margin-bottom: 6px;">📅 Two-Stage Strategy</div>
<div style="font-size: 0.85em; line-height: 1.5;">
<strong style="color: #9945FF;">Phase 1:</strong> $100K Grant → Philippines Pilot<br/>
<strong style="color: #9945FF;">Phase 2:</strong> $2-5M Seed → 4-Market Scale<br/>
<strong style="color: #14F195;">Phase 3:</strong> Series A → 1M+ Users
</div>
</div>

</div>
<div>

### 🎁 What Solana Gets

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">

<div class="achievement-box" style="padding: 10px;">
<strong style="color: #9945FF;">Novel Innovation</strong><br/>
<span style="font-size: 0.85em;">First BLE proximity-verified DeFi</span>
</div>

<div class="achievement-box" style="padding: 10px;">
<strong style="color: #9945FF;">Bot Farm Solution</strong><br/>
<span style="font-size: 0.85em;">Solves $2.3B fraud crisis</span>
</div>

<div class="achievement-box" style="padding: 10px;">
<strong style="color: #9945FF;">Real Utility</strong><br/>
<span style="font-size: 0.85em;">Financial inclusion beyond speculation</span>
</div>

<div class="achievement-box" style="padding: 10px;">
<strong style="color: #9945FF;">User Onboarding</strong><br/>
<span style="font-size: 0.85em;">85M+ unbanked to Solana</span>
</div>

</div>

<div class="achievement-box" style="padding: 8px; text-align: center; font-size: 0.95em;">
<strong style="color: #9945FF;">USDC Utility</strong> - Real-world stablecoin lending at scale
</div>

</div>
</div>

<div class="proof-box" style="font-size: 1.1em; text-align: center; padding: 10px 20px;">
<strong>Contact:</strong> alex@nanocredit.world | 
🌐 <a href="https://nanocredit.world" style="color: #9945FF; text-decoration: none; font-weight: bold;">nanocredit.world</a> | 
🎥 <a href="https://www.nanocredit.world/how-it-works" style="color: #9945FF; text-decoration: none; font-weight: bold;">Live Demo</a>
</div>

</div>

<!--
SPEAKER NOTES (40 seconds):
"Here's what we're asking for - a smart two-stage approach.

Phase 1: $100K USDC Solana grant for a 6-month Philippines pilot. Prove BLE proximity works at scale with 2,000 users and 50 merchants. This de-risks the model and validates unit economics.

Phase 2: After grant success, $2-5 million seed round to scale across Philippines, Kenya, Brazil, and Argentina. SAFE or priced equity, $15-20M valuation cap.

In return, Solana's ecosystem gets four transformative things. First, the first BLE proximity-verified DeFi protocol - solving the $2.3B bot farm crisis. Second, real utility beyond speculation - onboarding 85 million unbanked adults. Third, real-world USDC utility at nano-scale. Fourth, a showcase for Solana's performance making micro-transactions profitable.

We've proven this works - 94% repayment rate on World Chain. Solana contracts are production-ready. Active partnerships with M-Pesa, Peddlr, and FSD Africa.

Let's schedule a follow-up call. You can reach me at alex@nanocredit.world. Visit nanocredit.world to see our innovation.

Thank you. Let's bring fair credit to 85 million unbanked on Solana together."
-->
