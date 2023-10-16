import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

import { IDailogProp } from "@/types/componentTypes";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

const ComingSoonDialog = ({ openDialog, setOpenDialog }: IDailogProp) => {
  const router = useRouter();
  const { data: session } = useSession();
  const username = session?.user?.name
  const handleDialog = () => {
    setOpenDialog(false);
    router.push("/");
  };
  return (
    <Dialog open={openDialog} onOpenChange={handleDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`${
            username ? username : "Welcome"
          }, your account is secured on Stubbz`}</DialogTitle>
          <DialogDescription>
            {`Thank you for choosing Stubbz. We're still building and you're super early to the event industry revolution!`}{" "}
            <br />
            {`You'll be one of the first to know as soon as we fully launch.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleDialog}>Thank You</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoonDialog;
