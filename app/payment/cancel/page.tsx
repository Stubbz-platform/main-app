'use client'
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

const PaymentCancelPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2 h-full">
      <h2 className="text-xl font-bold">Looks like you cancelled payment</h2>
      <p>Why not retry?</p>
      <Button onClick={() => router.push("/")}>Retry</Button>
    </div>
  );
};

export default PaymentCancelPage;
