'use client'
import React from 'react'
import HomeMain from '@/components/home/HomeMain'
import MainHomePage from '@/components/home/mainHomePage';
import { useWallet } from "@solana/wallet-adapter-react";
import WalletConnectButton from '@/components/common/WalletConnectButton';

import { useRouter } from 'next/navigation';

const TestPage = () => {
  const { publicKey, signMessage, disconnecting, disconnect, connected } =
    useWallet();
  const router = useRouter() 

  // if(!connected) {
  //   router.push("/")
  // }
  return (
      <div className="">
        <WalletConnectButton />
      </div>
  );
}

export default TestPage