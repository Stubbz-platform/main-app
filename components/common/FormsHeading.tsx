import Image from 'next/image';
import React from 'react'
import partyOne from "/public/images/party01.png";
import partyTwo from "/public/images/party02.png";

const FormsHeading = ({ page }: { page: string }) => {
  return (
    <div className="flex items-center justify-between gap-6">
      <h2 className="text-2xl font-semibold max-w-xs pt-[23px]">{page} to Stubbz tickets</h2>
      <div className="relative">
        <Image src={partyOne} alt="party_one" className="rounded-full" />
        <Image
          src={partyTwo}
          alt="party_two"
          className="rounded-full absolute bottom-[-60%] left-[25%]"
        />
      </div>
    </div>
  );
};

export default FormsHeading