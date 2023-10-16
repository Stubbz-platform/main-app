import {
  ReactNode,
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
export interface modalsInterface {
    themeToggleModal: false,
    profileToggleModal: false
}
export interface generalContextInterface {
  openModal: modalsInterface;
  modifyOpenModal: (modal: string) => void;
  setOpenModal?: Dispatch<SetStateAction<modalsInterface>>;
}

export type generalContextProviderProps = {
  children: ReactNode;
};
