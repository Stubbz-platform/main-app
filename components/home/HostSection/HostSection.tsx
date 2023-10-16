import React from 'react'
import HostSectionCta from './Cta'
import invite from "/public/images/paper_invite.png";
import circle from "/public/images/host_circle.png";
import glasses from "/public/images/shining_glasses.png";
import stairs from "/public/images/stairs_formation.png";
import Image from 'next/image';

const HostSection = () => {
  return (
    <section className="py-8 px-6 md:px-0" id="host-section">
      <div className="w-full bg-primary flex flex-col items-center justify-center relative py-[60px] px-[20px] lg:p-[150px] rounded-[32px]">
        <Image
          src={circle}
          alt="circle"
          className="absolute left-[3%] top-[3%] w-[50px] h-[50px] lg:w-[125px] lg:h-[125px]"
          loading="lazy"
        />
        <Image
          src={invite}
          alt="paper_invite"
          className="absolute right-[-5%] top-[-5%] w-[70px] h-[50px] lg:w-[160px] lg:h-[90px]"
          loading="lazy"
        />
        <HostSectionCta />
        <Image
          src={glasses}
          alt="paper_invite"
          className="absolute left-[-5%] bottom-[-5%] w-[50px] h-[50px] lg:w-[110px]"
          loading="lazy"
        />
        <div className="rounded-br-[32px] w-[180px] h-[60px] lg:w-[380px] lg:h-[200px] absolute right-0 bottom-0">
          <div className="w-full rounded-br-[32px] relative overflow-hidden h-full">
            <Image
              src={stairs}
              alt="stairs_invite"
              className="w-full h-full absolute right-[-60%]"
              fill={true}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HostSection