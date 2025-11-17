'use client';

import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { celo, celoAlfajores } from 'viem/chains';
import { QueryClient } from '@tanstack/react-query';
import type { AppKitNetwork } from '@reown/appkit/networks';
import { cookieStorage, createStorage } from 'wagmi';

// WalletConnect Project ID - Replace with your actual project ID from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '8b0afcaf99464b72fe69705db84248f0';

// Define Celo networks
export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [celo, celoAlfajores];

// Metadata for your dApp
export const metadata = {
  name: 'Celo DeFi Hub',
  description: 'Swap, Bridge & Cross-chain transfers on Celo',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://celo-defi.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
});

// Create query client
export const queryClient = new QueryClient();

// Create AppKit instance only on client-side
let modal: ReturnType<typeof createAppKit> | null = null;

if (typeof window !== 'undefined') {
  modal = createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    metadata,
    features: {
      analytics: true,
      email: true,
      socials: ['google', 'x', 'discord', 'farcaster', 'github'],
      emailShowWallets: true,
      allWallets: true,
      onramp: true,
    },
    defaultNetwork: celo,
    enableWalletConnect: true,
    enableInjected: true,
    enableEIP6963: true,
    enableCoinbase: true,
    themeMode: 'dark',
    themeVariables: {
      '--w3m-accent': '#22c55e',
      '--w3m-color-mix': '#22c55e',
      '--w3m-color-mix-strength': 40,
      '--w3m-border-radius-master': '8px'
    },
    featuredWalletIds: [
      'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
      'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa', // Coinbase
      '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
    ]
  });
}

export { modal };
export const config = wagmiAdapter.wagmiConfig;
