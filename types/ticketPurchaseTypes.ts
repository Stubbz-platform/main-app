import {
  ReactNode,
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import {
  getMerkleProof,
  CandyMachine,
  Metaplex,
  NftWithToken,
  MintLimitGuardSettings,
  Metadata,
  Pda,
} from "@metaplex-foundation/js";
import { AccountInfo, PublicKey } from "@solana/web3.js";

export type purchaseStatus = "idle" | "failed" | "successful" | "processing" | "finalized";
export interface ticketPurchaseContextInterface {
  candyMachine?: any;
  candyMachineAddress: PublicKey,
  userWalletBalance?: number;
  purchaseStatus?: purchaseStatus;
  setPurchaseStatus?: Dispatch<SetStateAction<purchaseStatus>>;
  disabledPurchase?: boolean;
  setDisabledPurchase?: Dispatch<SetStateAction<boolean>>;
  wallet: {};
  currentTicket?: NftWithToken;
  setCurrentTicket: Dispatch<SetStateAction<NftWithToken | undefined>>;
  checkEligibility?: (candyMachineAddress: string) => void;
  purchaseTicket?: () => void;
}

export type ticketPurchaseContextProviderProps = {
  children: ReactNode;
};

export type TokenPayment$Gate = {
  mint: PublicKey;
  amount: number;
  symbol?: string;
  decimals: number;
};


export type GuardGroup = {
  // address: PublicKey;
  startTime?: Date;
  endTime?: Date;
  payment?: {
    sol?: {
      amount: number;
      decimals: number;
    };
    token?: TokenPayment$Gate;
    nfts?: Metadata[];
    requiredCollection?: PublicKey;
  };
  burn?: {
    token?: TokenPayment$Gate;
    nfts?: Metadata[];
    requiredCollection?: PublicKey;
  };
  gate?: {
    token?: TokenPayment$Gate;
    nfts?: Metadata[];
    requiredCollection?: PublicKey;
  };
  // payments?: PaymentGuard[];
  mintLimit?: MintLimitLogics;
  redeemLimit?: number;
  allowed?: PublicKey[];
  allowList?: Uint8Array;
  gatekeeperNetwork?: PublicKey;
};

export type MintLimitLogics = {
  settings: MintLimitGuardSettings;
  pda?: Pda;
  accountInfo?: AccountInfo<Buffer>;
//   mintCounter?: MintCounterBorsh; //MintCounter;
};
