"use client";
import React, { useEffect, useState } from "react";
import { TicketEventTypes } from "@/types/ticketTypes";
import Image from "next/image";
import { Banknote, CalendarDays, Dot, Map, MapPin } from "lucide-react";
import Link from "next/link";
import { ITicket, ITicketClass } from "@/types/ticketTypes";
import { getDateAndTime, getPriceRange } from "@/helpers/helperFunctions";
import image from "/public/images/city_block_party.png";

interface PageProps {
  eventData: ITicket;
}

const TicketCardExt = ({ eventData }: PageProps) => {
  const [dateTime, setDateTime] = useState<string>("")

  useEffect(() => {
    setDateTime(getDateAndTime(eventData.dateTime))
  }, [eventData]) 
  const priceRange = getPriceRange(eventData.tickets);
  return (
    <div className="flex flex-col gap-[calc(40px-16px)] border-2 py-3 rounded-lg hover:bg-accent  hover:ease-in-out delay-100 transition-all duration-500 min-w-[300px]">
      <h4 className="text-xl px-2 font-semibold max-w-[400px] h-10">
        {eventData.name}
      </h4>
      <Image
        src={image}
        alt={eventData.name}
        // fill
        className="w-full"
      />
      <div className="flex flex-col gap-2 pl-2">
        <div className="flex items-center gap-2">
          <CalendarDays className="text-primary w-5 h-5" />
          <span className="text-sm font-medium opacity-80">{dateTime ? dateTime : "loading date..."}</span>
        </div>
        <div className="flex items-center gap-2">
          <Banknote className="text-primary w-5 h-5" />
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold">{priceRange}</span>
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
        <div className="flex items-center gap-2">
          <MapPin className="text-primary w-5 h-5" />
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium opacity-80">
              {eventData.location}
            </span>
          </div>
          <Map className="text-primary w-5 h-5" />
          <Link
            href={`https://www.google.com/maps/place/${eventData.location}`}
            className="underline"
          >
            Map direction
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCardExt;
