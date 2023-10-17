'use client'
import React from 'react'
import { TicketEventTypes } from '@/types/ticketTypes'
import Image from 'next/image'
import { Banknote, CalendarDays, Dot } from 'lucide-react';
import Link from 'next/link';
import { ITicket, ITicketClass } from '@/types/ticketTypes';
import { getDateAndTime } from '@/helpers/helperFunctions';
import image from "/public/images/city_block_party.png"


interface ChildProps {
  eventData: ITicket;
}

const TicketCard = ({ eventData }: ChildProps) => {

  const dateTime = getDateAndTime(eventData.dateTime);
  return (
    <Link
      href={`/ticket/${eventData._id}`}
      className="flex flex-col gap-[calc(40px-16px)] border-2 py-3 rounded-lg hover:bg-accent  hover:ease-in-out delay-100 transition-all duration-500"
    >
      <h4 className="text-xl px-2 font-semibold max-w-[300px] h-10">
        {eventData.name}
      </h4>
      <Image
        src={image}
        alt={eventData.name}
        className="w-full"
      />
      <div className="flex flex-col gap-2 pl-2">
        <div className="flex items-center gap-2">
          <CalendarDays className="text-primary w-5 h-5" />
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium opacity-80">{dateTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Banknote className="text-primary w-5 h-5" />
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold">
              ${100} - ${1000}
            </span>
            <span className="text-[12px] text-[#E01414] font-medium">
              (100 tickets remaining)
            </span>
            {/* {eventData.ticketDifference ? (
              <span className="text-[12px] text-[#E01414] font-medium">
                ({eventData.ticketDifference} tickets remaining)
              </span>
            ) : (
              <span>Sold Out</span>
            )} */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TicketCard