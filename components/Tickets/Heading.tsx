import Image from 'next/image'
import React from 'react'
import patterns from "/public/images/patterns.png"

const Heading = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="space-y-3 font-semibold text-left max-w-[250px]">
        <span className="text-primary">Explore events</span>
        <h4 className="text-2xl lg:4xl">Amazing events for you</h4>
      </div>
      <Image src={patterns}  alt="patterns" className="w-[80px] lg:w-[110px]" loading="lazy" />
    </div>
  );
}

export default Heading