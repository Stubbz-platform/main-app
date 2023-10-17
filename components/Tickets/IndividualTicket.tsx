import { ITicket } from '@/types/ticketTypes'
import TicketCardExt from '../common/TicketCardExt';
import TicketsSelect from '../common/TicketsSelect';

interface PageProps {
  ticket: ITicket;
}

const IndividualTicket = ({ ticket }: PageProps) => {
  return (
    <div className='space-y-6'> 
        <TicketCardExt eventData={ticket} />
        <TicketsSelect eventData={ticket} />
    </div>
  );
};

export default IndividualTicket