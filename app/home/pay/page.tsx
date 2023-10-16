'use client'
import { useRouter } from 'next/navigation';
// import { airdropNft } from "@/lib/airdropNft";
import WalletConnectButton from '@/components/common/WalletConnectButton';
import React, { useContext } from 'react'
import { useWallet } from '@solana/wallet-adapter-react';

const PaymentPage = () => {
  const router = useRouter();
  const { publicKey, signMessage, disconnecting, disconnect, connected } =
    useWallet();
  const createSession = async () => {
    const response = await fetch("/api/candypay-session", {
      method: "POST",
      body: JSON.stringify({
        name: "stubbz Ticket",
        price: 0.01,
        tokens: ["dust", "samo"],
      }),
    });
    const data = await response.json();

    console.log(data)

    router.push(data.message.payment_url);
  };
  return (
    <div>
      <p>Buy your Solana Shades</p>
      <button
        className="bg-primary text-white p-2 rounded-lg"
        onClick={createSession}
      >
        Checkout
      </button>
      <WalletConnectButton />
      <button
        className="bg-secondary-foreground text-white p-2 rounded-lg"
      >
        get air
      </button>
    </div>
  );
}

export default PaymentPage