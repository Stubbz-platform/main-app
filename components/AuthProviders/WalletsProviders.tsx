"use client";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SolflareWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import { UmiProvider } from "../providers/UmiProviders";

const WalletsProviders = ({ children }: { children: React.ReactNode }) => {
  const network = WalletAdapterNetwork.Mainnet;
  // const endpoint = useMemo(() => clusterApiUrl(network), []);
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC!;
  const wallets = useMemo(
    () => [
      new LedgerWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new PhantomWalletAdapter(),
    ],
    [network]
  );
  return (
      <WalletProvider wallets={wallets} autoConnect>
        <UmiProvider endpoint={endpoint}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </UmiProvider>
      </WalletProvider>
  );
};

export default WalletsProviders;
