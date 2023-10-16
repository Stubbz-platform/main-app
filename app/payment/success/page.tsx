import { BadgeCheck } from 'lucide-react';
import React from 'react'

const PaymentSuccessPage = () => {
  return (
    <section className='min-h-screen flex flex-col items-center justify-center gap-2 h-full'>
      <h2 className='text-xl font-bold'>Your payment is successful!</h2>
      <p>Check your wallet for your Ticket</p>
      <BadgeCheck className='text-primary'/>
    </section>
  );
}

export default PaymentSuccessPage