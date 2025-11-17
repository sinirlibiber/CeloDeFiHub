'use client';

import { useState } from 'react';
import { useAccount, useChainId, useSwitchChain, useBalance } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDownUp, AlertCircle, Wallet } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { formatUnits } from 'viem';

interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
}

const CELO_TOKENS: Token[] = [
  { symbol: 'CELO', name: 'Celo', address: '0x471ece3750da237f93b8e339c536989b8978a438', decimals: 18 },
  { symbol: 'cUSD', name: 'Celo Dollar', address: '0x765de816845861e75a25fca122bb6898b8b1282a', decimals: 18 },
  { symbol: 'cEUR', name: 'Celo Euro', address: '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73', decimals: 18 },
  { symbol: 'cREAL', name: 'Celo Real', address: '0xe8537a3d056da446677b9e9d6c5db704eaab4787', decimals: 18 },
];

export function SwapComponent(): JSX.Element {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const [fromToken, setFromToken] = useState<string>('CELO');
  const [toToken, setToToken] = useState<string>('cUSD');
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [isSwapping, setIsSwapping] = useState<boolean>(false);

  // Get selected token details
  const selectedToken = CELO_TOKENS.find((t) => t.symbol === fromToken);

  // Fetch balance for selected token
  const { data: balanceData } = useBalance({
    address: address,
    token: selectedToken?.symbol === 'CELO' ? undefined : selectedToken?.address as `0x${string}`,
    chainId: chainId,
  });

  // Format balance
  const formattedBalance = balanceData 
    ? parseFloat(formatUnits(balanceData.value, balanceData.decimals)).toFixed(6)
    : '0.000000';

  // Handle percentage selection
  const handlePercentageSelect = (percentage: number): void => {
    if (!balanceData) {
      toast.error('No balance available');
      return;
    }
    const balance = parseFloat(formatUnits(balanceData.value, balanceData.decimals));
    const amount = (balance * percentage / 100).toFixed(6);
    setFromAmount(amount);
    calculateEstimate(amount);
  };

  const handleSwapTokens = (): void => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwap = async (): Promise<void> => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsSwapping(true);
    
    try {
      // In a real implementation, you would call the Celo swap contract here
      // For now, we'll simulate a swap
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success('Swap completed successfully!');
      setFromAmount('');
      setToAmount('');
    } catch (error) {
      console.error('Swap error:', error);
      toast.error('Swap failed. Please try again.');
    } finally {
      setIsSwapping(false);
    }
  };

  const calculateEstimate = (amount: string): void => {
    if (!amount || isNaN(parseFloat(amount))) {
      setToAmount('');
      return;
    }
    // Simple estimation (in real implementation, fetch from DEX)
    const estimate = parseFloat(amount) * 0.98;
    setToAmount(estimate.toFixed(6));
  };

  const isCeloNetwork = chainId === 42220 || chainId === 44787;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Swap Tokens</CardTitle>
        <CardDescription>Exchange tokens on Celo network</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isCeloNetwork && isConnected && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please switch to Celo Mainnet or Alfajores Testnet
              <Button
                size="sm"
                variant="outline"
                className="ml-2"
                onClick={() => switchChain({ chainId: 42220 })}
              >
                Switch Network
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* From Token */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">From</label>
            {isConnected && balanceData && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Wallet className="h-3 w-3" />
                <span>Balance: {formattedBalance} {fromToken}</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => {
                setFromAmount(e.target.value);
                calculateEstimate(e.target.value);
              }}
              className="flex-1"
            />
            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CELO_TOKENS.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Percentage Selection Buttons */}
          {isConnected && balanceData && (
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="flex-1 text-xs"
                onClick={() => handlePercentageSelect(25)}
              >
                25%
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="flex-1 text-xs"
                onClick={() => handlePercentageSelect(50)}
              >
                50%
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="flex-1 text-xs"
                onClick={() => handlePercentageSelect(75)}
              >
                75%
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="flex-1 text-xs font-bold"
                onClick={() => handlePercentageSelect(100)}
              >
                MAX
              </Button>
            </div>
          )}
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full"
            onClick={handleSwapTokens}
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <label className="text-sm font-medium">To (estimated)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              readOnly
              className="flex-1"
            />
            <Select value={toToken} onValueChange={setToToken}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CELO_TOKENS.filter((t) => t.symbol !== fromToken).map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Exchange Rate */}
        {fromAmount && toAmount && (
          <div className="text-sm text-muted-foreground text-center">
            1 {fromToken} ≈ {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken}
          </div>
        )}

        {/* Swap Button */}
        <Button
          className="w-full"
          size="lg"
          onClick={handleSwap}
          disabled={!isConnected || isSwapping || !fromAmount || !isCeloNetwork}
        >
          {!isConnected
            ? 'Connect Wallet'
            : isSwapping
            ? 'Swapping...'
            : 'Swap Tokens'}
        </Button>

        {/* Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Slippage Tolerance:</span>
            <span>2%</span>
          </div>
          <div className="flex justify-between">
            <span>Network Fee:</span>
            <span>~0.0001 CELO</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
