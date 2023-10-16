'use client'
import { ArrowDownToLine, Search } from 'lucide-react';
import React, { ChangeEvent, FormEvent } from 'react'
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '../ui/button';
import {
  TicketEventTypes,
  EventsFilterProps,
  ITicket,
} from "../../types/ticketTypes";
import { EventLocations } from '@/constants/data';

interface IEventsFilterProps extends EventsFilterProps {
  handleLocationFilter: (location: string) => void;
}

const EventsFilter = ({
  filterLocation,
  setFilterLocation,
  allTicketData,
  setAllTicketData,
  handleLocationFilter,
}: IEventsFilterProps) => {

  const handleInputFilter = (event:ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const inputFilteredEvents = allTicketData?.filter((events:ITicket) => (
         events.name.toLowerCase().includes(value) || events.location.toLowerCase().includes(value) 
    ));
    setAllTicketData(inputFilteredEvents)
  }

  return (
    <div className="w-full flex items-center gap-2 lg:gap-4 justify-between border rounded-full p-3">
      <div className="relative bg-primary h-6 w-6 p-3 rounded-full">
        <Search size={16} className="text-white absolute inset-0 m-auto" />
      </div>
      <Input
        type="text"
        placeholder="Search Events in"
        className="border-none focus-visible:!ring-offset-0 focus-visible:ring-0"
        onChange={handleInputFilter}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            className="space-x-1 items-center text-accent-foreground focus-visible:!ring-offset-0 focus-visible:ring-0"
          >
            <span className="text-[14px] lg:text-xl font-medium">
              {filterLocation || "Location"}
            </span>
            <ArrowDownToLine size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter Events by Location</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {EventLocations.map((location, index) => (
              <>
                <DropdownMenuItem
                  key={index}
                  onClick={() => handleLocationFilter(location.city)}
                >
                  {location.city}, {location.code}
                </DropdownMenuItem>
                {/* <DropdownMenuSeparator /> */}
              </>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleLocationFilter("")}
            >
              View All
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EventsFilter