import HeroSection from './HeroSection/HeroSection';
import HostSection from './HostSection/HostSection';
import AllTickets from '../Tickets/AllTickets'
import { ITicket } from '@/types/ticketTypes';


interface HomeProps {
  ticketsData: ITicket[];
}


const HomeMain = ({ ticketsData } : HomeProps) => {
  return (
    <div className="space-y-14">
      <HeroSection />
      <AllTickets ticketsData={ticketsData} />
      <HostSection />
    </div>
  );
};

export default HomeMain

