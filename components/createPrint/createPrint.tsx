'use client'
import { useUmi } from "@/context/useUmi";
import { getPartnerData } from "@/helpers/helperFunctions";
import { ITicket, ITicketClass } from "@/types/ticketTypes";
import { createNft, printSupply } from "@metaplex-foundation/mpl-token-metadata";
import { createGenericFileFromBrowserFile, generateSigner, percentAmount } from "@metaplex-foundation/umi";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import WalletConnectButton from "../common/WalletConnectButton";
import { Button } from "../ui/button";
import AuthPrintWallet from "./walletAuthDialog";

const CreatePrintNFT = () => {
  const wallet = useWallet();
  const umi = useUmi();
  const [openDialog, setOpenDialog] = useState<boolean>(true);
  const [dbAddress, setDbAddress] = useState<string>("");
  const [printState, setPrintState] = useState<"idle" | "printing" | "done">("idle")

  const convertImageToBlob = async (imgSrc: string, fileName: string) => {
    try {
      const response = await fetch(imgSrc);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    } catch (error) {
      console.error("Error fetching or converting the image:", error);
    }
  };

  const getDBAddress = (address: string) => {
    setDbAddress(address);
  }

  const print = async () => {
    const partnerData = getPartnerData("Capital Block")!;
    const numOfTicketsToMint = partnerData?.tickets.length!;
    const mintClassArray = [] //For storing the different class of tickets
    setPrintState("printing");
    for (let i = 0; i < numOfTicketsToMint; i++) {
      const currentTicket = partnerData?.tickets[i];
      const currentPic = currentTicket?.image!;
      const currentMetadata = currentTicket?.metadata!;
      const mintQuantity = currentTicket?.quantity!;
      const sellerFee = currentTicket?.fee!;
      try {
        //convert the image to a blob
        const imageToFile = await convertImageToBlob(
          currentPic.src,
          "image.png"
        );
        //Convert it to an webFile;
        const imageFile = await createGenericFileFromBrowserFile(imageToFile!);
        //Upload asset to nft storage provider;
        const [imageUri] = await umi.uploader.upload([imageFile]);
        //upload the nft and the metadata onchain;
        const uri = await umi.uploader.uploadJson({
          ...currentMetadata,
          image: imageUri,
        });
        //generate signer in readiness for mint;
        const mint = generateSigner(umi);
        //mint the nft;
        console.log(`minting ${currentMetadata.name} now`)
        await createNft(umi, {
          mint,
          name: currentMetadata.name,
          uri: uri,
          sellerFeeBasisPoints: percentAmount(sellerFee),
          printSupply: printSupply("Limited", [mintQuantity]),
        }).sendAndConfirm(umi);
        //get the pubkey of the mint;
        const mintAddress = mint.publicKey;
        //mint class of each ticket
        const mintClass: ITicketClass = {
          ticketClass: currentTicket.ticketClass!,
          image: imageUri,
          metadata: currentMetadata,
          quantity: mintQuantity,
          sellerFee,
          price: currentTicket.price!,
          publicKey: mintAddress,
        };
        mintClassArray.push(mintClass);
        console.log(`done minting ${i + 1} ticket class`)
      } catch (error) {
        console.log(error);
      }
    }

    const printData: ITicket = {
      ...partnerData,
      tickets: mintClassArray,
    };

    const response = await fetch("/api/print/create", {
      method: "POST",
      body: JSON.stringify(printData),
    });
    setPrintState("done")
  };

  return (
    <div className="space-y-3">
      {dbAddress && (
        <>
          <WalletConnectButton />
          <Button onClick={print} className="w-full" disabled={printState === "printing"}>Create Print</Button>
        </>
      )}
      <AuthPrintWallet
        dbAddress={dbAddress}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        getDBAddress={getDBAddress}
      />
      {/* <WalletConnectButton />
      <Button
        onClick={print}
        className="w-full"
        disabled={printState === "printing"}
      >
        Create Tickets
      </Button> */}
      {printState === "done" && <p>All Tickets successfully Minted</p>}
    </div>
  );
};

export default CreatePrintNFT;
