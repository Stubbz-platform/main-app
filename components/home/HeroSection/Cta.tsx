import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Cta = () => {
  return (
    <Link
      href="/"
      className="bg-[#FFF1F7] rounded-2xl flex items-center justify-center gap-2 w-[360px] p-[4px] hover:scale-110 hover:-translate-y-1 hover:ease-in-out delay-100 transition-all duration-500"
    >
      <span className="bg-white rounded-2xl px-1 text-primary text-[10px] md:text-sm">
        Learn
      </span>
      <div className="flex items-center gap-1 text-sm">
        <span className="text-[#C64191]">
          Nfts for more than just specification
        </span>
        <ArrowRight className="text-[#ED77A9]" size={10} />
      </div>
    </Link>
  );
}

export default Cta