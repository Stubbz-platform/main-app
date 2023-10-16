'use client'
import {
  modalsInterface, generalContextInterface,
  generalContextProviderProps,
} from "@/types/generalContextTypes";
import { FC, createContext, useState } from "react";

export const GeneralContext = createContext<generalContextInterface>(
  {} as generalContextInterface
);

const GeneralContextProvider:FC<generalContextProviderProps> = ({ children }) =>  {

  const [openModal, setOpenModal] = useState<modalsInterface>(
    {} as modalsInterface
  );

  const modifyOpenModal = (modal: string) => {
    if(openModal.hasOwnProperty(modal)) {
        setOpenModal(modals => {
            return {
                ...modals,
                modal: !modal
            }
        })
    }
  }

  return (
    <GeneralContext.Provider
      value={{ openModal, modifyOpenModal }}
    >
      <div>{children}</div>
    </GeneralContext.Provider>
  );
}

export default GeneralContextProvider