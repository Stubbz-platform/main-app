import IndividualTicket from '@/components/Tickets/IndividualTicket';
import { ITicket } from '@/types/ticketTypes';
import type { Metadata } from 'next';

const getIndividualTicketData = async (id: string): Promise<ITicket> => {
  const response = await fetch(
    `${process.env.SITE_URL}/api/tickets/${id}`, {cache: "no-store"}
  );
  const ticket = await response.json();
  return ticket;
}

export const generateMetaData = async({params}: {params: {id: string }}): Promise<Metadata> => {
  const ticket = await getIndividualTicketData(params.id);
  return {title: ticket.name};
}

const IndividualTicketPage = async ({ params }: { params: { id: string } }) => {
  const ticket: ITicket = await getIndividualTicketData(params.id);
  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-10">
      <IndividualTicket ticket={ticket} />
    </section>
  );
};

export default IndividualTicketPage;