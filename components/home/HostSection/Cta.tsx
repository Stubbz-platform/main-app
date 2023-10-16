import React from 'react'
import { Button } from '@/components/ui/button';

const HostSectionCta = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 lg:gap-5">
      <h4 className='text-3xl lg:text-4xl font-semibold text-white'>Host an Event</h4>
      <p className="max-w-[600px] mx-auto text-white">
        We provide top line event management and ticketing infrastructures for
        you, from enabling seemless entrance to security arrangements and more.
      </p>
      <Button variant="outline">Contact us</Button>
    </div>
  );
}

export default HostSectionCta