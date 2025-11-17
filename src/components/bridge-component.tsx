'use client';

import { useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link2, AlertCircle, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface Network {
  id: number;
  name: string;
  currency: string;
}

const SUPPORTED_NETWORKS: Network[] = [
  { id: 42220, name: 'Celo Mainnet', currency: 'CELO' },
  { id: 44787, name: 'Alfajores Testnet', currency: 'CELO' },
  { id: 1, name: 'Ethereum', currency: 'ETH' },
  { id: 137, name: 'Polygon', currency: 'MATIC' },
  { id: 8453, name: 'Base', currency: 'ETH' },
];

export function BridgeComponent(): JSX.Element {
  const { isConnected } = useAccount();
  const chainId = useChainId();

  const [fromNetwork, setFromNetwork] = useState<string>('42220');
  const [toNetwork, setToNetwork] = useState<string>('1');
  const [amount, setAmount] = useState<string>('');
  const [isBridging, setIsBridging] = useState<boolean>(false);

  const handleBridge = async (): Promise<void> => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (fromNetwork === toNetwork) {
      toast.error('Source and destination networks must be different');
      return;
    }

    setIsBridging(true);
    
    try {
      // In a real implementation, you would call the bridge contract here
      // This would involve approving tokens and initiating the bridge transfer
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      toast.success('Bridge transfer initiated! Check your wallet for confirmation.');
      setAmount('');
    } catch (error) {
      console.error('Bridge error:', error);
      toast.error('Bridge transfer failed. Please try again.');
    } finally {
      setIsBridging(false);
    }
  };

  const fromNetworkData = SUPPORTED_NETWORKS.find((n) => n.id === parseInt(fromNetwork));
  const toNetworkData = SUPPORTED_NETWORKS.find((n) => n.id === parseInt(toNetwork));

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          Bridge Assets
        </CardTitle>
        <CardDescription>Transfer tokens across different networks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Bridge transfers may take 10-30 minutes to complete. Please be patient.
          </AlertDescription>
        </Alert>

        {/* From Network */}
        <div className="space-y-2">
          <label className="text-sm font-medium">From Network</label>
          <Select value={fromNetwork} onValueChange={setFromNetwork}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_NETWORKS.map((network) => (
                <SelectItem key={network.id} value={network.id.toString()}>
                  {network.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Arrow Indicator */}
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-2">
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>

        {/* To Network */}
        <div className="space-y-2">
          <label className="text-sm font-medium">To Network</label>
          <Select value={toNetwork} onValueChange={setToNetwork}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_NETWORKS.filter((n) => n.id !== parseInt(fromNetwork)).map((network) => (
                <SelectItem key={network.id} value={network.id.toString()}>
                  {network.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <Input
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="text-xs text-muted-foreground">
            Currency: {fromNetworkData?.currency}
          </div>
        </div>

        {/* Estimate */}
        {amount && parseFloat(amount) > 0 && (
          <div className="p-4 border rounded-lg space-y-2 bg-muted/50">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">You will receive:</span>
              <span className="font-semibold">
                ~{(parseFloat(amount) * 0.995).toFixed(6)} {toNetworkData?.currency}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Bridge Fee (0.5%):</span>
              <span>{(parseFloat(amount) * 0.005).toFixed(6)} {fromNetworkData?.currency}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Estimated Time:</span>
              <span>15-30 minutes</span>
            </div>
          </div>
        )}

        {/* Bridge Button */}
        <Button
          className="w-full"
          size="lg"
          onClick={handleBridge}
          disabled={!isConnected || isBridging || !amount || fromNetwork === toNetwork}
        >
          {!isConnected
            ? 'Connect Wallet'
            : isBridging
            ? 'Bridging...'
            : 'Bridge Tokens'}
        </Button>

        {/* Warning */}
        <Alert variant="destructive" className="text-xs">
          <AlertCircle className="h-3 w-3" />
          <AlertDescription>
            Always double-check network and amount before bridging. Transfers cannot be reversed.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
