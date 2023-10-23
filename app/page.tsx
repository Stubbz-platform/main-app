import HomeMain from "@/components/home/HomeMain";
const fetchAllTickets = async () => {
  console.log(process.env.SITE_URL);
  const response = await fetch(`${process.env.SITE_URL}/api/tickets`, {
    cache: "no-store",
  });
  const tickets = await response.json();
  return tickets;
};

export default async function Home() {
  const ticketsData = await fetchAllTickets();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 flex flex-col lg:flex-row text-center lg:max-w-6xl lg:w-full lg:text-left">
        <HomeMain ticketsData={ticketsData} />
      </div>
    </main>
  );
}
