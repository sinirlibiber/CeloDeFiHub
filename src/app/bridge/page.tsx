'use client';

import { BridgeComponent } from '@/components/bridge-component';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Clock, Network } from 'lucide-react';

export default function BridgePage(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Cross-Chain Bridge</h1>
          <p className="text-muted-foreground">
            Transfer assets securely between Celo and other blockchains
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Bridge Component */}
          <div className="lg:col-span-2">
            <BridgeComponent />
          </div>

          {/* Info Cards */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Network className="h-4 w-4" />
                  Multi-Chain Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Bridge assets between Celo, Ethereum, Polygon, Base, and more chains.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Battle-Tested Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our bridge contracts are audited by top security firms and have secured millions in transfers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Transfer Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Initiation: Instant</li>
                  <li>• Processing: 10-20 minutes</li>
                  <li>• Confirmation: 15-30 minutes</li>
                  <li>• Total Time: ~30 minutes</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="text-sm text-muted-foreground space-y-2">
                  <li>1. Select source and destination networks</li>
                  <li>2. Enter amount to bridge</li>
                  <li>3. Approve transaction in your wallet</li>
                  <li>4. Wait for cross-chain confirmation</li>
                  <li>5. Receive tokens on destination network</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
