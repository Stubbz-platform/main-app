import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  percentAmount,
  generateSigner,
  keypairIdentity,
  keypairPayer,
  createSignerFromKeypair,
  publicKey,
  transactionBuilder,
  signTransaction,
} from "@metaplex-foundation/umi";
import {
  mplTokenMetadata,
  createNft,
  printSupply,
  fetchMasterEditionFromSeeds,
  TokenStandard,
  printV1,
  createProgrammableNft,
} from "@metaplex-foundation/mpl-token-metadata";
import base58 from "bs58";


export const printNft = async (payerWallet: string) => {
  // Use the RPC endpoint of your choice.
  const umi = createUmi(process.env.SOLANA_RPC!).use(mplTokenMetadata());
  // Restore a keypair using its secret key.
  const devKeypair = umi.eddsa.createKeypairFromSecretKey(
    base58.decode(process.env.STUBBZ_PRIVATE_KEY!)
  );
  umi.use(keypairIdentity(devKeypair));
  try {
    const editionMint = generateSigner(umi);
    //Need to fetch data or something here
    const masterEditionMint = publicKey(
      "CcYo9gMMTi6uY12Grir9ZXqPnLNdCoCBg5nCQm2srhDc"
    );
    const masterEdition = await fetchMasterEditionFromSeeds(umi, {
      mint: masterEditionMint,
    });
    let printTxn = await printV1(umi, {
      masterTokenAccountOwner: createSignerFromKeypair(umi, devKeypair),
      masterEditionMint,
      editionMint,
      editionTokenAccountOwner: publicKey(payerWallet),
      editionNumber: masterEdition.supply + BigInt(1),
      tokenStandard: TokenStandard.FungibleAsset,
    }).buildAndSign(umi);

    const signature = await umi.rpc.sendTransaction(printTxn, {
      skipPreflight: true,
    });

    console.log(signature.toString());
  } catch (error) {
    console.log(error);
  }
  return;
};
