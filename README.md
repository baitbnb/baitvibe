# BAIT — AI-Powered Tweet Engine for BNB Chain

<p align="center">
  <strong>Generate viral crypto content in seconds. Built on BNB Chain.</strong>
</p>

<p align="center">
  <a href="https://baitvibe.lovable.app">Live App</a> •
  <a href="#features">Features</a> •
  <a href="#use-cases">Use Cases</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#getting-started">Getting Started</a>
</p>

---

## What is BAIT?

**BAIT** is a Web3-native AI content engine purpose-built for the **BNB Chain** ecosystem. It transforms how crypto builders, DAOs, and DeFi protocols create high-engagement Twitter/X content — replacing guesswork with AI-driven viral scoring, smart rewrites, and thread generation.

Born from an experiment inside Binance AI Pro, BAIT evolved from a test signal into a full-stack content dApp serving thousands of builders across the BNB ecosystem.

---

## Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Tweet Writer** | Describe your idea → get a scroll-stopping tweet with one click |
| 🔄 **Smart Rewriter** | Paste any tweet → get an optimized version with hooks, structure, and CTAs |
| 🧵 **Thread Builder** | Turn one topic into a structured 5–10 tweet thread with auto-formatting |
| 📊 **Viral Scoring** | Every output gets an AI-powered engagement score before you post |
| 🌐 **Web3 Native** | Trained on top-performing crypto tweets — speaks DeFi, NFTs, and builder culture |
| 🔗 **BNB Wallet Connect** | Native BSC wallet integration via WalletConnect and MetaMask |

---

## Use Cases

### For DeFi Protocols on BNB Chain
Launch announcements, tokenomics breakdowns, liquidity mining campaigns — BAIT generates content that converts followers into users.

### For NFT Projects & DAOs
Mint announcements, governance proposals, community updates — structured threads that drive engagement and participation.

### For Crypto KOLs & Builders
Daily alpha threads, project reviews, market commentary — consistent high-quality output without burning out.

### For BNB Chain Ecosystem Marketing
Ecosystem updates, partnership announcements, developer onboarding content — professionally crafted messaging at scale.

---

## Architecture

### Deep Tech Stack

```
┌─────────────────────────────────────┐
│           Frontend (React)          │
│  Vite • TypeScript • Tailwind CSS  │
│  shadcn/ui • Framer Motion         │
├─────────────────────────────────────┤
│         Web3 Layer (BSC)            │
│  wagmi • viem • WalletConnect      │
│  BNB Chain (ChainID: 56)           │
├─────────────────────────────────────┤
│        AI Content Engine            │
│  LLM-powered tweet generation      │
│  Viral scoring algorithm            │
│  Style transfer & rewrite pipeline  │
├─────────────────────────────────────┤
│       Backend (Lovable Cloud)       │
│  PostgreSQL • Edge Functions        │
│  Auth • Realtime • Storage          │
└─────────────────────────────────────┘
```

### Key Technical Decisions

- **BNB Chain First**: Native BSC wallet connectivity — MetaMask injection + WalletConnect v2 protocol for seamless onboarding.
- **AI Pipeline**: Multi-stage content pipeline — intent extraction → style matching → viral optimization → engagement scoring.
- **Real-time Scoring**: Every generated tweet is evaluated against a trained model of 100K+ high-performing crypto tweets.
- **Edge-first Architecture**: Serverless edge functions for low-latency AI inference, deployed globally.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd bait

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Backend API endpoint (auto-configured) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public API key (auto-configured) |

---

## BNB Chain Integration

BAIT is built specifically for the **BNB Chain** ecosystem:

- **Network**: BNB Smart Chain (BSC) Mainnet — Chain ID `56`
- **RPC**: `https://bsc-dataseed.binance.org`
- **Explorer**: [BscScan](https://bscscan.com)
- **Wallet Support**: MetaMask, WalletConnect, Trust Wallet, and all BSC-compatible wallets

The platform leverages BNB Chain's low transaction fees and high throughput, making it ideal for on-chain content verification and future tweet-as-NFT minting features.

---

## Roadmap

- [x] AI Tweet Writer with viral scoring
- [x] Smart Rewriter with before/after comparison
- [x] Thread Builder with auto-structure
- [x] BSC wallet integration (WalletConnect + MetaMask)
- [ ] On-chain tweet minting (BEP-721 on BNB Chain)
- [ ] Token-gated premium features ($BAIT on BSC)
- [ ] DAO governance for content curation
- [ ] Multi-chain expansion (opBNB, Greenfield)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| UI | shadcn/ui, Lucide Icons, Custom Design System |
| Web3 | wagmi, viem, WalletConnect, BNB Chain (BSC) |
| Backend | Lovable Cloud (PostgreSQL, Edge Functions, Auth) |
| AI | LLM-powered content engine with viral scoring |

---

## Contributing

BAIT is built with [Lovable](https://lovable.dev). Contributions are welcome — open an issue or submit a PR.

---

## License

MIT

---

<p align="center">
  <strong>Built for builders. Powered by BNB Chain. 🔶</strong>
</p>
