
import { StaticImageData } from "next/image";
import {
  ReactNode,
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export interface TicketEventTypes {
  title: string;
  event_type: string;
  location: string;
  image: StaticImageData;
  date: string;
  time: string;
  min_price: string;
  max_price: string;
  total_tickets: number;
  tickets_sold: number;
  is_soldout: boolean;
  ticket_types: Record<string, string>;
  ticketDifference: number;
}




export interface ITicketMetaData {
  name: string;
  symbol: string;
  description: string;
  attributes?: { trait_type: string; value: string }[];
  properties?: [];
}


export interface ITicketClass {
  _id?: string;
  ticketClass: string; //e.g "Regular", "VIP"
  publicKey: string; // To identify it onchain
  image: string; //Iamge of the individual ticket
  metadata: ITicketMetaData;
  quantity: number; //Total supply of that particular ticket class
  sellerFee: number; //% of secondary sale to be collected by seller
  price: number; //Price of this particular class of ticket
}

export interface ITicket {
  _id?: string;
  name: string;
  location: string;
  eventType: string;
  dateTime: string;
  // totalQuantity: number;
  // totalSold: number
  // minPrice: number;
  // maxPrice: number;
  // image: string;
  tickets: ITicketClass[];
}

export interface EventsFilterProps {
  filterLocation?: string;
  setFilterLocation: Dispatch<SetStateAction<string>>;
  allTicketData: ITicket[];
  setAllTicketData: Dispatch<SetStateAction<ITicket[]>>;
}