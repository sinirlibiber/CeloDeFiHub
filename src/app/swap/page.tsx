'use client';

import { SwapComponent } from '@/components/swap-component';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Shield, Zap } from 'lucide-react';

export default function SwapPage(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Token Swap</h1>
          <p className="text-muted-foreground">
            Exchange tokens instantly on Celo with the best rates
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Swap Component */}
          <div className="lg:col-span-2">
            <SwapComponent />
          </div>

          {/* Info Cards */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Lightning Fast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Swaps execute in seconds with Celo's fast block times and low network congestion.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Best Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our smart routing finds the best exchange rates across multiple Celo DEXs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Secure & Non-Custodial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your funds never leave your wallet. All swaps are executed through audited smart contracts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Supported Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• CELO - Native token</li>
                  <li>• cUSD - US Dollar stablecoin</li>
                  <li>• cEUR - Euro stablecoin</li>
                  <li>• cREAL - Brazilian Real stablecoin</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
