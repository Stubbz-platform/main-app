'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ticketNumbers } from "@/constants/data";
import { ITicket, ITicketClass } from '@/types/ticketTypes';
import { ChevronDownCircle, Loader } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from "next/navigation";

interface PageProps {
  eventData: ITicket
}

export interface IPurchaseDetails {
  quantity: number;
  price: number;
  ticketClass: string | undefined;
}

const TicketsSelect = ({eventData}: PageProps) => {
  const router = useRouter();
  const [buttonState , setButtonState] = useState<"initial"| "loading">("initial")
  const [selectedTicket, setSelectedTicket] = useState<ITicketClass>();
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [purchaseDetails, setPurchaseDetails] = useState<IPurchaseDetails>({quantity: 0, price: 0, ticketClass: ""});

  const hanleTicketNumbers = (tix?: ITicketClass, qty?:number) => {
    const ticket = tix || selectedTicket;
    const quantity = qty || selectedQuantity;
    const details: IPurchaseDetails = {
      quantity: quantity!,
      price: ticket?.price! * quantity,
      ticketClass: ticket?.ticketClass,
    };
    setPurchaseDetails(details);
  }

    const createSession = async () => {
      setButtonState("loading")
    try {
      const response = await fetch("/api/candypay-session", {
        method: "POST",
        body: JSON.stringify({
          ...selectedTicket?.metadata,
          image: selectedTicket?.image,
          publicKey: selectedTicket?.publicKey,
          price: purchaseDetails.price,
          quantity: purchaseDetails.quantity,
        }),
      });
      const data = await response.json();
      router.push(data.response.payment_url);
    } catch (error) {
      console.error(error)
    } finally {
      setButtonState("initial");
    }
  };

  return (
    <div className="space-y-3">
      <h4>Available Tickets</h4>
      <div className="w-full flex items-center gap-3 justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="link"
              className="border flex gap-2 hover:no-underline hover:bg-accent text-accent-foreground w-1/2"
            >
              <span className="text-[12px] lg:text-lg font-medium">
                {selectedTicket?.ticketClass || "Ticket Type"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Ticket Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {eventData.tickets.map((ticket, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => {
                      setSelectedTicket(ticket);
                      hanleTicketNumbers(ticket, selectedQuantity);
                    }}
                    className="flex items-center justify-between"
                  >
                    <span>{ticket.ticketClass}</span>
                    <span>$ {ticket.price}</span>
                  </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="link"
              className="border flex items-center gap-2 text-accent-foreground w-1/2"
            >
              <span className="text-[12px] lg:text-lg font-medium">
                {purchaseDetails.quantity}
              </span>
              <ChevronDownCircle size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Quantity</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {ticketNumbers.map((number, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => {
                      setSelectedQuantity(Number(number))
                      hanleTicketNumbers(selectedTicket, Number(number));
                    }}
                  >
                    {number}
                  </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {purchaseDetails.quantity > 0 && purchaseDetails.ticketClass ? (
        <Button
          className="flex mt-3 gap-2 w-full"
          disabled={
            purchaseDetails.quantity < 0 || !purchaseDetails.ticketClass
          }
          onClick={createSession}
        >
          {buttonState === "loading" ? (
            <>
              <span>Loading...</span>
              <Loader className="h-5 w-5 animate-spin" />
            </>
          ) : (
            <>
              <span>$ {purchaseDetails.price}</span>
              <span>-</span>
              <span>{purchaseDetails.ticketClass}</span>
            </>
          )}
        </Button>
      ) : (
        <Button
          className="w-full mt-3 hover:disabled:cursor-not-allowed"
          disabled={true}
          onClick={createSession}
        >
          Buy
        </Button>
      )}
    </div>
  );
}

export default TicketsSelect