
'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';


interface IAuthPrint {
  dbAddress: string;
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  getDBAddress: (address: string) => void;
}

const AuthPrintWallet = ({
  dbAddress,
  openDialog,
  setOpenDialog,
  getDBAddress,
}: IAuthPrint) => {
  const [enteredAddress, setEnteredAddress] = useState<string>("");
  const router = useRouter();
  const handleDialog = () => {
    if(!dbAddress) {
      setOpenDialog(false);
      router.push("/");
    }
  };
  const verifyAddress = async () => {
    const response = await fetch(`/api/printAuth/${enteredAddress}`);
    const dbAddress = await response.json();
    getDBAddress(dbAddress);
    if (enteredAddress === dbAddress) {
      setOpenDialog(false);
    }
  };
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={handleDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>You aren&aptos;t supposed to be here!</DialogTitle>
            <DialogDescription>
              Since you&aptos;re already here, tell me, what&aptos;s the secret
              to stubbz?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Secret
              </Label>
              <Input
                id="name"
                value={enteredAddress}
                className="col-span-3"
                placeholder="Hint: The most famous beach in Cali"
                onChange={(e) => setEnteredAddress(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={verifyAddress}>
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthPrintWallet