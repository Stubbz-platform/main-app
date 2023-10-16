import React from 'react'
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import dynamic from 'next/dynamic';
// import "./wallet.css";
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic: any = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const WalletConnectButton = () => {
    const {
        publicKey,
        signMessage,
        disconnecting,
        disconnect,
        connected,
    } = useWallet();
    // console.log({
    //   publicKey,
    //   signMessage,
    //   disconnecting,
    //   disconnect,
    //   connected,
    // });
  return (
    <div className="">
      <WalletMultiButtonDynamic />
      {/* <WalletDisconnectButton /> */}
    </div>
  );
}

export default WalletConnectButton