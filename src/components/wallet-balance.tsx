'use client';

import { useAccount, useBalance } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function WalletBalance(): JSX.Element {
  const { address, isConnected, chain } = useAccount();
  
  const { data: celoBalance, isLoading: celoLoading } = useBalance({
    address: address,
    chainId: 42220, // Celo mainnet
  });

  const { data: alfajoresBalance, isLoading: alfajoresLoading } = useBalance({
    address: address,
    chainId: 44787, // Alfajores testnet
  });

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Balance
          </CardTitle>
          <CardDescription>Connect your wallet to view balances</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Please connect your wallet using the button above
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Wallet Balance
        </CardTitle>
        <CardDescription>
          {address?.slice(0, 6)}...{address?.slice(-4)} on {chain?.name || 'Unknown Network'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Celo Mainnet Balance */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-green-400 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold">Celo Mainnet</p>
              <p className="text-xs text-muted-foreground">CELO</p>
            </div>
          </div>
          <div className="text-right">
            {celoLoading ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              <>
                <p className="font-bold text-lg">
                  {celoBalance ? Number(celoBalance.formatted).toFixed(4) : '0.0000'}
                </p>
                <p className="text-xs text-muted-foreground">{celoBalance?.symbol}</p>
              </>
            )}
          </div>
        </div>

        {/* Alfajores Testnet Balance */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold">Alfajores Testnet</p>
              <p className="text-xs text-muted-foreground">CELO</p>
            </div>
          </div>
          <div className="text-right">
            {alfajoresLoading ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              <>
                <p className="font-bold text-lg">
                  {alfajoresBalance ? Number(alfajoresBalance.formatted).toFixed(4) : '0.0000'}
                </p>
                <p className="text-xs text-muted-foreground">{alfajoresBalance?.symbol}</p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
