'use client';

import { useAccount } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { History, ExternalLink, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface Transaction {
  hash: string;
  type: 'send' | 'receive';
  amount: string;
  timestamp: number;
  status: 'success' | 'pending' | 'failed';
  from: string;
  to: string;
}

export function TransactionHistory(): JSX.Element {
  const { address, isConnected } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isConnected && address) {
      // In a real implementation, you would fetch transactions from Celo blockchain
      // For now, we'll show placeholder data
      setLoading(true);
      setTimeout(() => {
        setTransactions([
          {
            hash: '0x1234...5678',
            type: 'send',
            amount: '10.5 CELO',
            timestamp: Date.now() - 3600000,
            status: 'success',
            from: address,
            to: '0xabcd...efgh',
          },
          {
            hash: '0x8765...4321',
            type: 'receive',
            amount: '5.25 CELO',
            timestamp: Date.now() - 7200000,
            status: 'success',
            from: '0xijkl...mnop',
            to: address,
          },
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [isConnected, address]);

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Transaction History
          </CardTitle>
          <CardDescription>Connect your wallet to view transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your recent transactions will appear here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Transaction History
        </CardTitle>
        <CardDescription>Recent transactions on Celo network</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No transactions found
          </p>
        ) : (
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div
                key={tx.hash}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      tx.type === 'send'
                        ? 'bg-red-100 dark:bg-red-900/20'
                        : 'bg-green-100 dark:bg-green-900/20'
                    }`}
                  >
                    {tx.type === 'send' ? (
                      <ArrowUpRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                    ) : (
                      <ArrowDownLeft className="h-5 w-5 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{tx.type === 'send' ? 'Sent' : 'Received'}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(tx.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <div>
                    <p className="font-bold">
                      {tx.type === 'send' ? '-' : '+'}{tx.amount}
                    </p>
                    <Badge
                      variant={
                        tx.status === 'success'
                          ? 'default'
                          : tx.status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                      className="text-xs"
                    >
                      {tx.status}
                    </Badge>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => window.open(`https://celoscan.io/tx/${tx.hash}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
