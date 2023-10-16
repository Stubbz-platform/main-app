import IndividualTicket from '@/components/Tickets/IndividualTicket';

const getIndividualTicketData = async (id: string) => {
  const response = await fetch(
    `${process.env.SITE_URL}/api/tickets/${id}`
  );
  const ticket = await response.json();
  return ticket;
}

const IndividualTicketPage = async({params}: any) => {
  
  const ticket = await getIndividualTicketData(params.id);
  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-10">
      <IndividualTicket ticket={ticket} />
    </section>
  );
}

export default IndividualTicketPage