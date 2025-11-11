<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Research blockchain nano-lending projects competing with Solana proximity-verified lending:

1. Blockchain projects offering uncollateralized loans under \$50 to unbanked populations
2. Any DeFi projects using Bluetooth/BLE or physical proximity for verification
3. Solana lending protocols with identity verification (World ID, Civic, Humanity Protocol)
4. Merchant-centric lending where funds go to merchants, not borrowers
5. Recent (2024-2025) blockchain microfinance with real users

For each: name, blockchain, status (live/testnet), key features, traction data, GitHub if available.

Now I'll compile the comprehensive research report with all the information gathered.

## Blockchain Nano-Lending Projects Competing with Solana Proximity-Verified Lending

### 1. Uncollateralized Nano-Loans Under \$50 to Unbanked Populations

**Divine Research** (San Francisco, USA)

- **Blockchain**: Multi-chain (USDC stablecoin-based)
- **Status**: Live since December 2024
- **Loan Size**: Under \$1,000, predominantly microloans[^1][^2][^3]
- **Key Features**:
    - Uses Worldcoin's World ID iris-scanning technology for borrower verification[^2][^4]
    - Uncollateralized loans at 20-30% interest rates[^3][^1]
    - Prevents multiple accounts through biometric authentication[^4][^2]
    - Issues partial Worldcoin tokens that can be reclaimed upon default[^5][^3]
- **Traction**: ~30,000 loans issued since late 2024[^1][^2][^3]
- **Default Rate**: 40% on first loans, factored into interest rate model[^3][^4][^1]
- **Target Users**: Unbanked overseas populations (teachers, fruit vendors, high-school teachers in inflation-affected countries like Argentina)[^6][^3]
- **GitHub**: No public repository found

**EthicHub** (Madrid, Spain)

- **Blockchain**: Ethereum (ERC-20 token: ETHIX)
- **Status**: Live since 2017, 7+ years operational[^7][^8]
- **Loan Size**: Microloans for smallholder farmers
- **Key Features**:
    - Crowd-lending platform connecting DeFi investors with unbanked farmers[^9][^7]
    - Smart contract-based collateral system (Blended Finance)[^10][^7]
    - Focus on coffee farmers in Latin America, Africa, and Asia[^8][^7]
    - 8% annual returns for lenders over 15-month periods[^8]
    - Direct market access for farmers to sell produce internationally[^7]
- **Traction**: 600+ successful loans, \$3+ million transferred, 2,000+ community members[^11][^7][^8]
- **Recent Funding**: \$1 million investment from Bybit and Blockchain for Good Alliance (March 2025)[^8]
- **GitHub**: https://github.com/ethichub (team members' contributions)[^12]

**Goldfinch Protocol** (Ethereum-based)

- **Blockchain**: Ethereum
- **Status**: Live since 2020
- **Loan Size**: Varies, targets small-to-medium businesses in emerging markets
- **Key Features**:
    - Decentralized credit protocol for real-world borrowers without crypto collateral[^13][^14]
    - Two-tier system: Backers (junior tranche) and Senior Pool (senior tranche)[^13]
    - Loans collateralized by off-chain real-world assets, not uncollateralized[^15][^13]
    - Uses trust-through-consensus model for creditworthiness assessment[^15][^13]
    - Partners with fintech lenders in emerging markets (LendEast, Addem Capital, Cauris)[^13]
- **Traction**: \$100+ million in loans financed across 5 continents[^13]
- **TVL**: Significant institutional adoption[^14]
- **GitHub**: https://github.com/goldfinch-eng/mono and https://github.com/goldfinch-eng/community-docs[^16][^15]


### 2. DeFi Projects Using Bluetooth/BLE or Physical Proximity for Verification

**No blockchain lending projects identified** using Bluetooth/BLE or physical proximity for verification in production environments. Research findings indicate:

- **BLE proximity authentication** exists for physical access control and login systems but has known vulnerabilities to relay attacks[^17][^18][^19]
- BLE relay attacks can operate at link layer with minimal latency (8ms round-trip), circumventing typical defenses[^18]
- **NCC Group research** (2022) demonstrated that link-layer relay attacks can bypass both latency bounding and encryption[^18]
- **Recommended alternatives**: Ultra-Wide Band (UWB) time-of-flight distance bounding for true proximity verification[^18]
- **Greeting Network** uses BLE to detect proximity and create cryptographic proof of physical presence, but focused on networking/events, not lending[^20]

**Key insight**: Physical proximity verification via Bluetooth for financial transactions remains an unsolved security challenge in blockchain lending, making your proposed proximity-verified lending model potentially novel in the DeFi space.

### 3. Solana Lending Protocols with Identity Verification

**Solana Attestation Service (SAS)** - Infrastructure Layer

- **Status**: Live on mainnet (May 2025)[^21][^22][^23]
- **Features**:
    - Open, permissionless protocol for verifiable credentials[^22][^21]
    - Enables KYC checks, geographic eligibility, accreditation status[^21][^22]
    - Portable, reusable credentials across Solana ecosystem[^22][^21]
    - Integration with World ID, Civic, Solid, Trusta Labs[^24]
- **GitHub**: Part of Solana Identity Group repositories

**Civic Pass** (Solana)

- **Blockchain**: Solana
- **Status**: Live, 2+ million verifications processed[^25][^26]
- **Features**:
    - KYC process: email, phone, photo ID, 3D face-map[^27][^25]
    - OFAC sanctions screening[^25]
    - Integration with Solrise DEX Pro and other Solana DeFi apps[^25]
    - Multiple verification levels: CAPTCHA to full government ID[^26]
    - Non-transferable attestation tokens on-chain[^26]
- **Integration**: Works with Solana lending protocols (not direct lending)[^28][^25]
- **GitHub**: civic repositories on GitHub

**World ID on Solana** (via Wormhole)

- **Status**: Live since September 2024[^29][^30]
- **Features**:
    - Iris-scanning proof-of-personhood system[^30][^29]
    - Cross-chain verification via Wormhole Queries[^29][^30]
    - Enables Sybil-resistant applications on Solana[^30][^29]
    - Zero-knowledge proofs for privacy[^31]
- **Use Cases**: Can be integrated with lending protocols for human verification[^29][^30]

**Humanity Protocol** (Palm Recognition)

- **Blockchain**: Cross-chain, Ethereum settlement layer
- **Status**: Testnet live, mainnet launching early 2025[^32][^31]
- **Technology**:
    - Palm print and vein pattern recognition[^32][^31]
    - Dual-layer verification (mobile and hardware scanners)[^32]
    - Zero-knowledge proofs for privacy[^31][^32]
    - Self-Sovereign Identity (SSI) framework[^32]
- **Verifiable Credentials**: KYC, age, education, employment verification[^32]
- **Token**: Expected with mainnet (ERC-20 compatible)[^32]
- **Network**: Identity Validators and zkProofers (verifier nodes)[^32]

**Major Solana Lending Protocols** (with potential identity integration)

**Kamino Finance V2**

- **Status**: Live (June 2025 launch)[^33][^34][^35]
- **TVL**: \$4+ billion[^34][^33]
- **Features**:
    - Modular market infrastructure[^33][^34]
    - Automated lending vaults[^34][^33]
    - RWA integration (ACRED from Securitize/Apollo)[^35][^33][^34]
    - Isolated markets with custom parameters[^35][^33]
    - **V2 enables KYC-only pools** through modular market layer[^35]
- **Partnerships**: Marinade Finance, Securitize, Steakhouse Financial, Maple Finance[^33][^34][^35]
- **GitHub**: Kamino Finance repositories

**MarginFi V2**

- **Status**: Live on Solana
- **Features**: Overcollateralized lending with health factor monitoring[^36]
- **Identity**: No native identity verification layer identified

**Credix**

- **Status**: Live on Solana
- **Focus**: Institutional-grade credit deals for FinTech lenders in emerging markets[^36]
- **Features**:
    - Secured by real-world assets[^36]
    - Rigorous vetting before approval[^36]
    - Structured credit deals with specific terms[^36]
- **Identity**: Likely requires institutional KYC but details not public

**Port Finance, Solend, Tulip Protocol**

- **Status**: Live on Solana
- **Features**: Traditional overcollateralized DeFi lending[^36]
- **Identity**: No native identity verification identified


### 4. Merchant-Centric Lending (Funds to Merchants, Not Borrowers)

**No blockchain projects specifically identified** with merchant-centric lending where funds go directly to merchants instead of borrowers. Research findings show:

- **Traditional merchant financing** exists in blockchain supply chain finance (Ant Blockchain in China)[^37]
- **Stablecoin merchant payments** are growing (TransFi, PayRam) but focus on payments, not lending[^38][^39]
- **Blockchain merchant credit** typically involves merchants as borrowers, not payment recipients[^40]

**Related models found**:

- **Ant Blockchain (China)**: Supply chain finance where small businesses access credit based on upstream enterprise relationships, but funds still go to borrowers[^37]
- **Buy Now Pay Later (BNPL)** on blockchain: No major projects identified

**Key insight**: Merchant-centric lending (where loan funds go to merchants on behalf of borrowers) appears to be an underexplored niche in blockchain microfinance, presenting another novel opportunity for your proximity-verified model.

### 5. Recent Blockchain Microfinance with Real Users (2024-2025)

**3Jane Protocol** (Ethereum)

- **Status**: Mainnet launching November 2025[^41][^42][^43]
- **Funding**: \$5.2 million seed round led by Paradigm (June 2025)[^44][^45][^41]
- **Features**:
    - Uncollateralized USDC credit lines[^46][^41][^44]
    - 3CA Credit Risk Algorithm combining on-chain and off-chain data[^47][^44]
    - zkTLS (Reclaim Protocol) for private credit score verification[^44][^47]
    - Credit lines backed by verified CEX/bank assets, income, future cash flows[^41][^46][^44]
    - Jane Score for creditworthiness assessment[^44]
- **Target Users**: Yield farmers, traders, businesses, AI agents[^47][^44]
- **Current Traction**: \$7+ million in credit lines backed by \$83.1 million in verified assets (pre-mainnet)[^44]
- **Returns**: Up to 27% APY for sUSD3 stakers[^44]
- **Restrictions**: Initially limited to US residents with \$150,000+ assets[^42]
- **GitHub**: https://github.com/3jane-protocol (repositories exist but limited public code)[^48][^49]

**Wildcat Finance** (Ethereum)

- **Blockchain**: Ethereum
- **Status**: Live (V2 in 2024)[^50][^51][^52]
- **Funding**: \$3.5 million seed round (September 2025)[^50]
- **Features**:
    - Undercollateralized lending protocol[^53][^51][^50]
    - Borrowers create customized credit markets with own terms[^51][^52][^54]
    - Fixed interest rates, customizable reserves, withdrawal cycles[^52][^55]
    - Reputation-based lending for crypto-native institutions[^56][^51]
    - Transferable debt tokens[^52]
- **Target Users**: Market makers, investment funds, protocols seeking liquidity[^55]
- **Approach**: Settlement layer only, no centralized underwriting[^51][^56]
- **GitHub**: https://docs.wildcat.finance and wildcat-finance repositories

**Nolus Protocol** (Cross-chain DeFi Lease)

- **Status**: Live since June 2023[^57]
- **Transactions**: \$50+ million processed[^57]
- **TVL**: \$5 million from ~10,000 users[^57]
- **Features**:
    - Up to 150% financing (3x borrowing ratio)[^57]
    - Partial liquidations instead of full liquidation[^57]
    - DeFi Lease product for leveraged positions[^57]
- **Focus**: Reducing liquidation risk by 40% vs competitors[^57]

**Tala** (Kenya, Philippines, Mexico, India)

- **Status**: Live, mobile-first digital lending platform
- **Technology**: Machine learning for credit scoring using alternative data (not strictly blockchain)[^58][^59][^60]
- **Loan Size**: Nano-loans \$5-100, growing limits up to KSh 50,000 (~\$350)[^61][^58]
- **Traction**: Millions of customers, 90%+ repayment rates[^59][^58]
- **Interest**: 0.3% per day starting rate[^61]
- **AI Credit Engine**: Trained on billions of data points from 10+ years[^60]
- **Blockchain Status**: Traditional fintech, exploring blockchain integration[^59]
- **GitHub**: Not public

**Branch** (Kenya, Tanzania, Nigeria, India)

- **Status**: Live digital lending platform
- **Technology**: Machine learning, mobile data for credit scoring[^58][^59]
- **Loan Size**: Microloans with instant approval
- **Interest Rates**: 12-170%[^62]
- **Blockchain Status**: Traditional fintech platform[^59]

**M-Shwari** (Kenya - Safaricom/NCBA partnership)

- **Status**: Live since 2012
- **Loans Disbursed**: \$2.5+ billion to 15 million customers[^58]
- **Loan Size**: 90% of loans under \$30[^58]
- **Repayment Rate**: 95%+[^58]
- **Technology**: Mobile money integration via M-PESA, not blockchain-based[^58]

**Mikro Kapital** (Tokenized Bonds for Microfinance)

- **Status**: Live since 2023, regular issuances in 2024[^63]
- **Features**:
    - First tokenized bonds for microcredit (2023)[^63]
    - Uses blockchain for disintermediation and efficiency[^63]
    - Smart contracts for automated interest payments[^63]
    - Funds invested in MFIs that provide fiat microloans to SMEs in LMICs[^63]
- **Impact**: Speeds up capital raising for microfinance institutions[^63]
- **Markets**: Central Asia and other low/middle-income countries[^63]
- **Approach**: Wholesale financing (MFI-level), not direct-to-borrower[^63]


### Summary Table: Key Projects Comparison

| **Project** | **Blockchain** | **Status** | **Loan Type** | **Key Innovation** | **Traction** | **GitHub** |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| **Divine Research** | Multi-chain (USDC) | Live (Dec 2024) | Uncollateralized microloans <\$1,000 | World ID iris scanning, 30% rates, 40% default tolerance | 30,000 loans | Not found |
| **EthicHub** | Ethereum | Live (2017+) | Farmer microloans | Crowd-collateral, agricultural focus, 8% returns | 600+ loans, \$3M+ | github.com/ethichub |
| **Goldfinch** | Ethereum | Live (2020+) | RWA-backed business loans | Trust-through-consensus, off-chain collateral | \$100M+ loans | goldfinch-eng/mono |
| **3Jane** | Ethereum | Mainnet Nov 2025 | Uncollateralized credit lines | zkTLS credit proofs, AI agents, 27% APY | \$7M+ credit lines | 3jane-protocol |
| **Wildcat** | Ethereum | Live (V2 2024) | Undercollateralized institutional | Borrower-led markets, reputation-based | Growing | docs.wildcat.finance |
| **Civic Pass** | Solana | Live | Identity layer (not lending) | KYC/AML verification, 3D face-map | 2M+ verifications | civic repositories |
| **Kamino V2** | Solana | Live (June 2025) | Overcollateralized + RWA | Modular markets, KYC-pool capability | \$4B+ TVL | kamino repositories |
| **Solana Attestation Service** | Solana | Live (May 2025) | Identity infrastructure | Reusable credentials, privacy-preserving | Growing adoption | solana identity group |

### Critical Findings for Your Proximity-Verified Lending Project

**1. No Direct Competition in Proximity-Based Lending**

- Zero blockchain lending projects use Bluetooth/BLE proximity verification
- Physical proximity authentication has known security vulnerabilities[^18]
- UWB time-of-flight is recommended for secure distance bounding[^18]

**2. Merchant-Centric Model is Novel**

- No identified projects send loan funds to merchants instead of borrowers
- Most blockchain microfinance maintains traditional borrower-receives-funds model

**3. Identity Verification is Trending**

- Solana has strong identity infrastructure (SAS, Civic, World ID integration)[^24][^21][^22]
- World ID iris scanning used by Divine Research shows proof-of-concept for biometric lending[^2][^4]
- Zero-knowledge proofs enable privacy-preserving verification[^31][^47][^32]

**4. Uncollateralized Lending is High-Risk/High-Reward**

- Divine Research tolerates 40% defaults with 20-30% interest rates[^4][^3]
- 3Jane uses comprehensive underwriting (on-chain + off-chain credit data)[^47][^44]
- Most successful projects target specific populations or use alternative collateral[^7][^13]

**5. Under-\$50 Nano-Loans are Underserved**

- Divine loans mostly under \$1,000, very few sub-\$50 focused projects[^5][^2]
- M-Shwari (non-blockchain) excels at sub-\$30 loans with 95% repayment[^58]
- Tala/Branch use ML for nano-loans but not blockchain-native[^60][^58]

**6. Real Traction Indicators**

- EthicHub: 7 years, 600+ loans, \$3M+ volume[^7][^8]
- Divine: 6 months, 30,000 loans (but 40% default)[^2][^3]
- Goldfinch: \$100M+ loans across 5 continents[^13]
- 3Jane: Pre-mainnet, strong VC backing (\$5.2M Paradigm)[^41][^44]

Your **Solana proximity-verified, merchant-centric nano-lending under \$50** concept combines multiple underexplored elements, positioning it as genuinely novel in the blockchain microfinance landscape.
<span style="display:none">[^100][^101][^102][^103][^104][^105][^64][^65][^66][^67][^68][^69][^70][^71][^72][^73][^74][^75][^76][^77][^78][^79][^80][^81][^82][^83][^84][^85][^86][^87][^88][^89][^90][^91][^92][^93][^94][^95][^96][^97][^98][^99]</span>

<div align="center">⁂</div>

[^1]: https://www.ainvest.com/news/resurgence-crypto-lending-assessing-risks-rewards-unsecured-ai-driven-models-2025-2507/

[^2]: https://idtechwire.com/crypto-lender-uses-world-id-iris-scans-to-expand-access-to-microloans/

[^3]: https://www.ainvest.com/news/divine-research-issues-30k-unbacked-usdc-loans-world-id-40-default-rate-20-30-interest-rates-2507/

[^4]: https://www.ainvest.com/news/divine-research-launches-biometric-crypto-lending-model-40-default-rate-20-30-interest-offset-losses-2507/

[^5]: https://cryptocoin.news/news/divine-research-pioneers-uncollateralized-crypto-loans-with-sam-altmans-world-id-134055/

[^6]: https://slguardian.org/crypto-lending-resurges-as-startups-like-divine-push-unsecured-loans/

[^7]: https://chainforgood.org/news/detail/0f2e51d7-316b-4770-a3c0-bae3a56c4ad2

[^8]: https://www.ethichub.com/en/blog/ethichub-bybit-bga-join-forces-to-strengthen-access-to-financing

[^9]: https://www.f6s.com/ethichub

[^10]: https://dacxichain.com/podcasts/ethichub-impact-investing-regenerative-finance/

[^11]: https://blockspot.io/coin/ethichub/

[^12]: http://bitcoinwiki.org/wiki/ethichub

[^13]: https://research.nansen.ai/articles/goldfinch-a-defi-credit-protocol

[^14]: https://www.blockchainappfactory.com/blog/goldfinch-defi-real-world-lending-social-impact/

[^15]: https://github.com/goldfinch-eng/community-docs

[^16]: https://github.com/goldfinch-eng/mono

[^17]: https://www.bleuio.com/blog/building-a-secure-proximity-based-login-system-with-bluetooth-low-energy-ble/

[^18]: https://www.nccgroup.com/research-blog/technical-advisory-ble-proximity-authentication-vulnerable-to-relay-attacks/

[^19]: https://www.hypr.com/security-encyclopedia/proximity-authentication

[^20]: https://greeting.network

[^21]: https://solana.com/ar/news/solana-attestation-service

[^22]: https://solana.com/news/solana-attestation-service

[^23]: https://www.linkedin.com/pulse/solana-foundation-unveils-decentralized-identity-protocol-rxscc

[^24]: https://www.binance.com/en/square/post/24685328031233

[^25]: https://www.coindesk.com/business/2021/09/23/why-civic-is-building-defi-identity-tools-on-solana

[^26]: https://solanacompass.com/projects/civic

[^27]: https://www.tekedia.com/the-hidden-identity-layer-for-solana/

[^28]: https://identityreview.com/civic-announces-integration-with-solana-blockchain-for-defi-wallet/

[^29]: https://cryptodnes.bg/en/world-id-launches-on-solana-blockchain-amid-regulatory-concerns/

[^30]: https://world.org/blog/announcements/wormhole-brings-world-id-solana-new-integrations-take-off-globally

[^31]: https://www.blocmates.com/articles/a-complete-guide-to-humanity-protocol

[^32]: https://blog.mexc.com/what-is-h-humanity-protocol/

[^33]: https://oakresearch.io/en/analyses/fundamentals/kamino-v2-new-standard-on-chain-credit-solana-beyond

[^34]: https://www.rockawayx.com/insights/kamino-launches-v2-ushering-in-a-new-era-of-modular-credit-infrastructure-on-solana

[^35]: https://research.nansen.ai/articles/kamino-finance-powering-the-next-wave-of-onchain-lending

[^36]: https://solanacompass.com/projects/category/defi/lending-borrowing

[^37]: https://www.alibabacloud.com/blog/ant-blockchain-in-finance-helping-small-businesses-obtain-funds-through-microfinance_595747

[^38]: https://www.transfi.com/blog/stablecoin-payments-in-retail-how-merchants-are-embracing-digital-dollars

[^39]: https://cryptoprocessing.com/insights/how-blockchain-can-supercharge-b2b-payments

[^40]: https://www.linkedin.com/pulse/microloans-blockchain-powering-financial-inclusion-small-rtlle

[^41]: https://www.binance.com/en/square/post/25188548463218

[^42]: https://www.mexc.co/en-IN/news/the-lending-protocol-3jane-will-launch-on-the-mainnet-in-early-november/145941

[^43]: https://www.tradingview.com/news/cointelegraph:336c27280094b:0-divine-research-issues-unbacked-crypto-loans-using-sam-altman-s-world-id/

[^44]: https://www.mexc.com/en-GB/news/paradigm-leads-the-bet-how-will-3jane-unlock-the-trillion-dollar-defi-unsecured-lending-market/149135

[^45]: https://www.linkedin.com/posts/cmointern_3janeprotocol-defi-cryptonativecredit-activity-7336252478650294272-xDjz

[^46]: https://bitkan.com/learn/what-is-3jane-can-unsecured-defi-lending-actually-work-56380

[^47]: https://satwikp.com/3Jane-Protocol

[^48]: https://github.com/3jane-protocol

[^49]: https://github.com/3jane-protocol/moneymarket-contracts

[^50]: https://crypto-fundraising.info/projects/wildcat-labs/

[^51]: https://web3.bitget.com/de/dapp/wildcat-25617

[^52]: https://wildcat.finance

[^53]: https://ethereum.org/de/apps/wildcat/

[^54]: https://www.alchemy.com/dapps/wildcat

[^55]: https://docs.wildcat.finance/overview/introduction

[^56]: https://assets.ctfassets.net/i0qyt2j9snzb/16NhYJISaPiiMVIEb05de2/1d652705b1ed8e4eda4fb12a9030988d/Wildcat_V2_-__Seeking_On-Chain_Credit_Expansion.pdf

[^57]: https://zycrypto.com/defi-lending-is-becoming-safer-and-more-sophisticated/

[^58]: https://www.linkedin.com/pulse/banking-unbanked-digital-microfinance-revolution-ripla-pgcert-pgdip-uy2mc

[^59]: https://qz.com/africa/1712796/mobile-loans-apps-tala-branch-okash-face-scrutiny-in-kenya

[^60]: https://tala.co

[^61]: https://tala.co.ke

[^62]: https://www.facebook.com/rightforeducationafrica/posts/digital-lending-is-changing-how-kenyans-access-credit-but-at-what-cost-from-conv/1265833788916242/

[^63]: https://nextbillion.net/tokenisation-in-microfinance-blockchain-based-technology-driving-faster-access-to-capital-entrepreneurs-emerging-markets/

[^64]: https://www.degruyterbrill.com/document/doi/10.21078/JSSI-2021-001-15/html?lang=en

[^65]: https://www.weforum.org/stories/2022/09/decentralized-finance-a-leapfrog-technology-for-the-unbanked/

[^66]: https://www.sciencedirect.com/science/article/abs/pii/S0040162524001963

[^67]: https://wjarr.com/sites/default/files/WJARR-2024-2379.pdf

[^68]: https://insurance-edge.net/2025/05/23/crypto-defi-offer-financial-inclusion-for-the-globally-unbanked/

[^69]: https://hackernoon.com/how-blockchain-is-redefining-financial-inclusion-for-the-unbanked-in-2025

[^70]: https://mintblue.com/blockchain-for-financial-inclusion/

[^71]: https://www.rootstocklabs.com/blog/financial-inclusion-and-defi/

[^72]: https://openknowledge.worldbank.org/entities/publication/12b4d788-dbec-5a29-b323-186684800729

[^73]: http://sdgprivatefinance.undp.org/leveraging-capital/sdg-investor-platform/affordable-micro-credit

[^74]: https://www.sciencedirect.com/science/article/pii/S0040162524001963/pdf

[^75]: https://tgmresearch.com/crypto-bridges-financial-gap-for-the-unbanked.html

[^76]: https://jbba.scholasticahq.com/article/132172.pdf

[^77]: https://www.oecd.org/en/publications/the-limits-of-defi-for-financial-inclusion_f00a0c7f-en.html

[^78]: https://coinlaw.io/unbanked-population-statistics/

[^79]: https://papers.ssrn.com/sol3/Delivery.cfm/5388323.pdf?abstractid=5388323\&mirid=1

[^80]: https://www.afi-global.org/wp-content/uploads/2024/10/AFI_AfPI_Special-Report_AW_digital_0.pdf

[^81]: https://www.chargespot.com/news/financing-workspace-expansion-for-crypto-startups/

[^82]: https://patents.google.com/patent/US20150084741A1/en

[^83]: https://www.sciencedirect.com/science/article/abs/pii/S0140366423000014

[^84]: https://arxiv.org/html/2505.24284v1

[^85]: https://www.wultra.com/blog/2024-product-updates-keep-fraudsters-out-of-the-game-with-proximity-based-authentication

[^86]: https://jics.org.br/ojs/index.php/JICS/article/download/555/381/2642

[^87]: https://www.tokenmetrics.com/blog/crypto-lending?0fad35da_page=42\&617b332e_page=61\&74e29fd5_page=4

[^88]: https://www.nature.com/articles/s41598-025-04566-4

[^89]: https://www.coingecko.com/learn/top-crypto-lending-protocols

[^90]: https://www.reddit.com/r/programming/comments/1ibekjr/building_a_secure_proximitybased_login_system/

[^91]: https://iptoki.com

[^92]: https://www.sciencedirect.com/science/article/pii/S2405844022028006

[^93]: https://www.europeanpaymentscouncil.eu/sites/default/files/kb/file/2019-06/EPC109-19v1.0 White paper MCPPs_final.pdf

[^94]: https://ieeexplore.ieee.org/document/10633471/

[^95]: https://www.bis.org/fsi/publ/insights49.pdf

[^96]: https://www.sciencedirect.com/science/article/pii/S2772918424000079

[^97]: https://www.osiztechnologies.com/news/solana-will-get-support-for-worldcoins-world-id

[^98]: https://www.humanity.org

[^99]: https://idtechwire.com/sumsub-launches-reusable-digital-id-verification-on-solana-blockchain/

[^100]: https://www.humanprotocol.org

[^101]: https://attest.solana.com/use-cases

[^102]: https://x.com/Humanityprot

[^103]: https://solanacompass.com/projects/category/digital-identity

[^104]: https://kensoninvestments.com/solana-defi-in-2025-risks-rewards-and-regulatory-considerations/

[^105]: https://merchantpaymentsecosystem.com/files/documents/state-of-the-merchant-payments-ecosystem-2025.pdf

