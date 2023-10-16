import React from 'react'
import Cta from './Cta'
import Heading from './Heading'
import bolt from "/public/images/lightning_bolt.png";
import Image from 'next/image';
import Video from './Video';

const HeroSection = () => {
  return (
    <section
      className="flex flex-col items-center justify-center gap-6 overflow-hidden py-8"
      id="hero-section"
    >
      <Cta />
      <Heading />
      <Image
        src={bolt}
        alt="bolt"
        className="absolute hidden lg:block left-[84%] top-[8%] rotate-[3deg] w-[200px] h-[300px]"
        // width={200}
        // height={300}
        loading="lazy"
      />
      <Video />
    </section>
  );
}

export default HeroSection