import {
  ReactNode,
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
export interface IDailogProp {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>
}
export interface MenuToggleProps {
  mobileMenuToggled?: boolean;
  setMobileMenuToggled: Dispatch<SetStateAction<boolean>>;
}



