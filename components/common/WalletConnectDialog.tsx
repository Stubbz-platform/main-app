import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';

import { IDailogProp } from "@/types/componentTypes";
import { Button } from '../ui/button';

const WalletConnectDialog = ({ openDialog, setOpenDialog }: IDailogProp) => {
  const router = useRouter();
  const handleDialog = () => {
    setOpenDialog(false);
    router.push("/dashboard")
  };
  return (
    <Dialog open={openDialog} onOpenChange={handleDialog}>
      {/* <DialogTrigger>{open}</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a wallet to your account</DialogTitle>
          <DialogDescription>
            All purchased cards and tickets will be sent to your connected
            wallet address. This will also be used for verification purposes.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Connect Wallet</Button>
          <Button variant="outline" onClick={handleDialog}>
            Not Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectDialog