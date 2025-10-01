'use client';

import { useState, useEffect } from 'react';
import { MiniKit } from '@farcaster/miniapp-sdk';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function WalletConnect() {
  const [isMiniKit, setIsMiniKit] = useState(false);
  const [minikitAddress, setMinikitAddress] = useState<string | null>(null);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    // Check if we're in MiniKit environment
    if (typeof window !== 'undefined') {
      const initialized = MiniKit.isInitialized();
      setIsMiniKit(initialized);

      if (initialized) {
        // Listen for MiniKit wallet events
        MiniKit.onWalletChange((address) => {
          setMinikitAddress(address);
        });

        // Check if already connected
        if (MiniKit.wallet.address) {
          setMinikitAddress(MiniKit.wallet.address);
        }
      }
    }
  }, []);

  const handleConnect = async () => {
    if (isMiniKit) {
      try {
        // Use MiniKit for wallet connection in Farcaster
        await MiniKit.wallet.connect();
      } catch (error) {
        console.error('MiniKit connection failed:', error);
      }
    } else {
      // Fallback to wagmi for direct browser access
      connect({ connector: injected() });
    }
  };

  const handleDisconnect = () => {
    if (isMiniKit) {
      // MiniKit disconnect
      MiniKit.wallet.disconnect();
      setMinikitAddress(null);
    } else {
      disconnect();
    }
  };

  const isWalletConnected = isConnected || !!minikitAddress;
  const displayAddress = minikitAddress || address;

  if (isWalletConnected) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-sm text-text-muted">
          {displayAddress?.slice(0, 6)}...{displayAddress?.slice(-4)}
        </div>
        <button
          onClick={handleDisconnect}
          className="btn-secondary text-sm py-2 px-3"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="btn-primary text-sm py-2 px-4"
    >
      Connect Wallet
    </button>
  );
}
