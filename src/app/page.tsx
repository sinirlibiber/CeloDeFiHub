'use client'
import { useAccount } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight, Link2, TrendingUp, Wallet, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { useAddMiniApp } from "@/hooks/useAddMiniApp";
import { useQuickAuth } from "@/hooks/useQuickAuth";
import { useIsInFarcaster } from "@/hooks/useIsInFarcaster";

export default function HomePage(): JSX.Element {
    const { addMiniApp } = useAddMiniApp();
    const isInFarcaster = useIsInFarcaster()
    useQuickAuth(isInFarcaster)
    useEffect(() => {
      const tryAddMiniApp = async () => {
        try {
          await addMiniApp()
        } catch (error) {
          console.error('Failed to add mini app:', error)
        }

      }

    

      tryAddMiniApp()
    }, [addMiniApp])
    useEffect(() => {
      const initializeFarcaster = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 100))
          
          if (document.readyState !== 'complete') {
            await new Promise<void>(resolve => {
              if (document.readyState === 'complete') {
                resolve()
              } else {
                window.addEventListener('load', () => resolve(), { once: true })
              }

            })
          }

    

          await sdk.actions.ready()
          console.log('Farcaster SDK initialized successfully - app fully loaded')
        } catch (error) {
          console.error('Failed to initialize Farcaster SDK:', error)
          
          setTimeout(async () => {
            try {
              await sdk.actions.ready()
              console.log('Farcaster SDK initialized on retry')
            } catch (retryError) {
              console.error('Farcaster SDK retry failed:', retryError)
            }

          }, 1000)
        }

      }

    

      initializeFarcaster()
    }, [])
  const { isConnected } = useAccount();

  const features = [
    {
      title: 'Token Swap',
      description: 'Exchange CELO, cUSD, cEUR, and cREAL instantly with low fees',
      icon: ArrowLeftRight,
      href: '/swap',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Cross-Chain Bridge',
      description: 'Transfer assets between Celo, Ethereum, Polygon, and Base',
      icon: Link2,
      href: '/bridge',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Profile & Portfolio',
      description: 'View your wallet balance and transaction history',
      icon: Wallet,
      href: '/profile',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const stats = [
    { label: 'Total Value Locked', value: '$1.2M', change: '+12.5%' },
    { label: '24h Volume', value: '$324K', change: '+8.3%' },
    { label: 'Total Transactions', value: '12,456', change: '+15.2%' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
          Celo DeFi Hub
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your gateway to decentralized finance on Celo. Swap, bridge, and manage your crypto assets seamlessly.
        </p>
        {!isConnected && (
          <div className="pt-4">
            <appkit-button />
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold">{stat.value}</p>
                <span className="text-sm text-green-500 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Link key={index} href={feature.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className={`h-12 w-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-between">
                    Get Started
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* About Celo */}
      <Card>
        <CardHeader>
          <CardTitle>Why Celo?</CardTitle>
          <CardDescription>Built for mobile-first DeFi</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Fast & Low Cost</h3>
            <p className="text-sm text-muted-foreground">
              Transactions confirm in seconds with fees under $0.01, making DeFi accessible to everyone.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Stable Tokens</h3>
            <p className="text-sm text-muted-foreground">
              Native stablecoins (cUSD, cEUR, cREAL) pegged to major fiat currencies for price stability.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Carbon Negative</h3>
            <p className="text-sm text-muted-foreground">
              Celo is a carbon-negative blockchain, offsetting more carbon than it produces.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Mobile-First</h3>
            <p className="text-sm text-muted-foreground">
              Designed for mobile devices with phone number mapping for easy peer-to-peer transfers.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Built By Section */}
      <Card className="bg-gradient-to-r from-yellow-50 to-green-50 dark:from-yellow-950/20 dark:to-green-950/20">
        <CardHeader>
          <CardTitle className="text-center">Built By</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/sinirlibiber"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">@sinirlibiber</span>
            </a>
            <a
              href="https://farcaster.xyz/gumusbey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.24 6.5C18.24 5.12 17.12 4 15.74 4H8.26C6.88 4 5.76 5.12 5.76 6.5V20L12 17L18.24 20V6.5Z" />
              </svg>
              <span className="font-semibold">@gumusbey</span>
            </a>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Built with ❤️ for the Celo ecosystem
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
