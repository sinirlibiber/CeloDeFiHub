'use client';

import { WalletBalance } from '@/components/wallet-balance';
import { TransactionHistory } from '@/components/transaction-history';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ProfilePage(): JSX.Element {
  const { address, isConnected, chain } = useAccount();

  const copyAddress = (): void => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard!');
    }
  };

  const openExplorer = (): void => {
    if (address && chain) {
      const explorerUrl = chain.id === 42220 
        ? `https://celoscan.io/address/${address}`
        : `https://alfajores.celoscan.io/address/${address}`;
      window.open(explorerUrl, '_blank');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your wallet and view transaction history
          </p>
        </div>

        {isConnected ? (
          <div className="space-y-6">
            {/* Account Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Information
                </CardTitle>
                <CardDescription>Your wallet details and network status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Wallet Address</p>
                    <p className="font-mono font-semibold">
                      {address?.slice(0, 10)}...{address?.slice(-8)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={copyAddress}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={openExplorer}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Connected Network</p>
                    <p className="font-semibold">{chain?.name || 'Unknown'}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Chain ID</p>
                    <p className="font-semibold">{chain?.id || 'N/A'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Balance and History Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              <WalletBalance />
              <TransactionHistory />
            </div>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Connect Your Wallet</CardTitle>
              <CardDescription>Please connect your wallet to view your profile</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-center max-w-md">
                Connect your wallet to access your profile, view balances, and track transaction history
              </p>
              <appkit-button />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
