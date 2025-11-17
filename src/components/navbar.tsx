'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight, Link2, User, Home, Wallet } from 'lucide-react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

export function Navbar(): JSX.Element {
  const pathname = usePathname();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/swap', label: 'Swap', icon: ArrowLeftRight },
    { href: '/bridge', label: 'Bridge', icon: Link2 },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-yellow-400 to-green-400"></div>
            <span className="text-xl font-bold">Celo DeFi Hub</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div>
            <Button
              onClick={() => open()}
              className="bg-green-500 hover:bg-green-600 text-black font-semibold"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {isConnected && address
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : 'Connect Wallet'}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className="flex flex-col h-auto py-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs mt-1">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
