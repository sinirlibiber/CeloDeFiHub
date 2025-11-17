import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ResponseLogger } from "@/components/response-logger";
import { cookies } from "next/headers";
import { ReadyNotifier } from "@/components/ready-notifier";
import { Web3Provider } from "@/components/web3-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import FarcasterWrapper from "@/components/FarcasterWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestId = cookies().get("x-request-id")?.value;

  return (
        <html lang="en">
          <head>
            {requestId && <meta name="x-request-id" content={requestId} />}
          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {/* Do not remove this component, we use it to notify the parent that the mini-app is ready */}
            <ReadyNotifier />
            <Web3Provider>
              <Navbar />
              <main className="min-h-screen bg-background pt-4">
                
      <FarcasterWrapper>
        {children}
      </FarcasterWrapper>
      
              </main>
              <Toaster />
            </Web3Provider>
            <ResponseLogger />
          </body>
        </html>
      );
}

export const metadata: Metadata = {
        title: "Celo Multi-Chain Dapp",
        description: "Connect to Celo mainnet & testnet, enabling swap, bridge, and cross-chain features. View wallet balance & transaction history. Integrates WalletConnect for seamless user experience.",
        other: { "fc:frame": JSON.stringify({"version":"next","imageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/thumbnail_7d2739ad-79ec-4fe5-b03e-579804bcf81f-u3qznQVv8EMCjfvPSnbLODR3rUsPZj","button":{"title":"Open with Ohara","action":{"type":"launch_frame","name":"Celo Multi-Chain Dapp","url":"https://broad-independent-306.app.ohara.ai","splashImageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/farcaster/splash_images/splash_image1.svg","splashBackgroundColor":"#ffffff"}}}
        ) }
    };
