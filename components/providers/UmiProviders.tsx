import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { createNftStorageUploader, nftStorageUploader } from "@metaplex-foundation/umi-uploader-nft-storage";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { useWallet } from "@solana/wallet-adapter-react";
import { ReactNode } from "react";
import { UmiContext } from "@/context/useUmi";


//Wrapper for transfering Tickets
export const UmiProvider = ({
  endpoint,
  children,
}: {
  endpoint: string;
  children: ReactNode;
}) => {
  const wallet = useWallet();
  const umi = createUmi(endpoint)
    .use(walletAdapterIdentity(wallet))
    .use(
      nftStorageUploader({
        token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY!,
      })
    )
    .use(mplTokenMetadata());

  return <UmiContext.Provider value={{ umi }}>{children}</UmiContext.Provider>;
};
