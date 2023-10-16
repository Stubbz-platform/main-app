import { TicketEventTypes } from "../types/ticketTypes"
import { CapitalBlockMintData } from "../partners/capitalblock/data"
import { allPartners } from "../partners/AllPartners"

// export function fetchAllTicketData(data: any[]): TicketEventTypes[] {
//   const flattenedData: TicketEventTypes[] = data.flatMap((item) => {
//     const events: TicketEventTypes[] = [];
//     for (const category in item) {
//       if (item.hasOwnProperty(category)) {
//         item[category].forEach((event: any) => {
//           for (const parties of Object.values(event)) {
//             if (Array.isArray(parties)) {
//               parties.forEach((party: TicketEventTypes) => {
//                 events.push({
//                   ...party,
//                   date: formatDate(party.date),
//                   ticketDifference: party.total_tickets - party.tickets_sold,
//                 });
//               });
//             }
//           }
//         });
//       }
//     }
//     return events;
//   });

//   return flattenedData.sort((a, b) => a.ticketDifference - b.ticketDifference);
// }

export const getPartnerData = (partnerName: string) => {
  switch (partnerName) {
    case "Capital Block":
      return CapitalBlockMintData;

    default:
      "unknown partner";
  }
}

export function getDateAndTime(dateandTime: string): string {
  const date = new Date(dateandTime);
  // Options for formatting
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short", // Short day name (e.g., 'Sat')
    day: "numeric", // Numeric day (e.g., '15')
    month: "short", // Short month name (e.g., 'Nov')
    year: "numeric", // Numeric year (e.g., '2023')
    hour: "numeric", // Numeric hour (e.g., '5')
    minute: "numeric", // Numeric minute (e.g., '00')
    hour12: true, // Use 12-hour clock format (e.g., '5pm')
  };

  // Format the date according to the user's locale
  const formattedDate = new Intl.DateTimeFormat(undefined, options).format(
    date
  );
  return formattedDate;
}



