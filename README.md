# Celo DeFi Hub 🌱

A modern decentralized finance (DeFi) application built on the Celo blockchain. Swap tokens, bridge assets across chains, and manage your crypto portfolio with ease.

## ✨ Features

- **Token Swap**: Exchange CELO, cUSD, cEUR, and cREAL instantly with low fees
- **Cross-Chain Bridge**: Transfer assets between Celo, Ethereum, Polygon, and Base
- **Wallet Management**: View balances across Celo mainnet and Alfajores testnet
- **Transaction History**: Track all your transactions with detailed information
- **Modern UI**: Beautiful, responsive design that works on desktop and mobile
- **WalletConnect Integration**: Connect with any wallet supporting WalletConnect v4

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm/pnpm/yarn
- A WalletConnect Project ID (get one at [cloud.walletconnect.com](https://cloud.walletconnect.com))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd celo-defi-hub
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Create a `.env.local` file and add your WalletConnect Project ID:
```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

4. Run the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌐 Networks Supported

- **Celo Mainnet** (Chain ID: 42220)
- **Celo Alfajores Testnet** (Chain ID: 44787)
- Ethereum, Polygon, Base (for bridging)

## 📦 Tech Stack

- **Framework**: Next.js 15
- **Blockchain**: Celo, Viem, Wagmi
- **Wallet**: Reown AppKit (WalletConnect v4)
- **UI**: Tailwind CSS, Radix UI
- **State**: React Query

## 🔧 Configuration

### WalletConnect Setup

1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create a new project
3. Copy your Project ID
4. Add it to your `.env.local` file

### Customization

You can customize the app in `src/config/web3.ts`:

```typescript
export const metadata = {
  name: 'Your DApp Name',
  description: 'Your description',
  url: 'https://yourdapp.com',
  icons: ['https://your-icon-url.com']
};
```

## 📱 Features Overview

### Swap
- Exchange tokens on Celo network
- Support for CELO, cUSD, cEUR, cREAL
- Real-time price estimates
- Low slippage tolerance

### Bridge
- Cross-chain asset transfers
- Multi-network support
- Transparent fee structure
- Transaction tracking

### Profile
- Wallet balance display
- Transaction history
- Network information
- Quick access to block explorer

## 🔐 Security

- Non-custodial: You always control your funds
- Audited smart contracts
- Secure wallet connections via WalletConnect
- No private keys stored

## 🌍 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variable: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
4. Deploy!

### Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 📄 License

MIT License - feel free to use this project for your own purposes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue in the GitHub repository.

## 🌱 About Celo

Celo is a carbon-negative, mobile-first blockchain that makes decentralized financial tools accessible to anyone with a mobile phone. Learn more at [celo.org](https://celo.org).

## 👨‍💻 Built By

Created by **@sinirlibiber** for the Celo ecosystem

- **GitHub**: [@sinirlibiber](https://github.com/sinirlibiber)
- **Farcaster**: [@gumusbey](https://farcaster.xyz/gumusbey)

---

Built with ❤️ for the Celo ecosystem
