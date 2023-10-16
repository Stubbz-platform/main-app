'use client'
import React, { useEffect, useMemo, useState } from 'react';
import { ITicket } from "../../types/ticketTypes";
import TicketCard from "../common/TicketCard";
import EventsFilter from './EventsFilter';
import Heading from './Heading';

interface PageProps {
  ticketsData: ITicket[];
}

const AllTickets = ({ ticketsData }: PageProps) => {
  const [filterLocation, setFilterLocation] = useState("");
  const [allTicketData, setAllTicketData] = useState<ITicket[]>(ticketsData);

  const handleLocationFilter = (location: string) => {
    if (location) {
      const locationFilteredEvents = ticketsData.filter(
        (ticket:ITicket) => ticket.location.toLowerCase() === location.toLowerCase()
      );
      setAllTicketData(locationFilteredEvents);
    } else {
      setAllTicketData(ticketsData);
    }
    setFilterLocation(location);
  };

  const diplayEvents = ticketsData.map((ticket:ITicket, index) => (
    <TicketCard key={index} eventData={ticket} />
  ));

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-8 px-8 md:px-0">
      <Heading />
      <EventsFilter
        handleLocationFilter={handleLocationFilter}
        filterLocation={filterLocation}
        setFilterLocation={setFilterLocation}
        allTicketData={ticketsData}
        setAllTicketData={setAllTicketData}
      />
      {allTicketData.length > 0 ? (
        <div className="flex flex-col items-center lg:flex-row gap-8 flex-wrap">
          {diplayEvents}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-[#E01414] text-xl">
            No event found for {filterLocation}
          </h4>
          <span className="text-sm">Search another location</span>
        </div>
      )}
    </section>
  );
};

export default AllTickets