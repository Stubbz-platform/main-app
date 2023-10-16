import premierleague from "../public/images/premierleague_party.png"
import blockparty from "../public/images/city_block_party.png"



export const ticketdata = [
  {
    night_parties: [
      {
        "Capital Block Party": [
          {
            title: "Capital Block Party! x Omah lay (sponsored by Guinness)",
            event_type: "night party",
            location: "Abuja",
            image: blockparty,
            date: "2023-10-15",
            time: "20:00",
            min_price: "200",
            max_price: "500",
            total_tickets: 500,
            tickets_sold: 250,
            is_soldout: false,
            ticket_types: {
              "General Access": "200",
              Premium: "300",
              "Table for 5": "400",
              "Table for 10": "500",
            },
          },
        ],
      },
      {
        "Premier League": [
          {
            title: "Premier League AfterPaty",
            event_type: "night party",
            location: "London",
            image: premierleague,
            date: "2023-09-30",
            time: "19:00",
            min_price: "150",
            max_price: "450",
            total_tickets: 400,
            tickets_sold: 200,
            is_soldout: false,
            ticket_types: {
              "General Access": "150",
              Premium: "250",
              "Table for 5": "350",
              "All Access": "450",
            },
          },
        ],
      },
    ],
  },
  {
    music_shows: [
      {
        "Afrobeats Live": [
          {
            title: "Legends of Afrobeats Live in Toronto",
            event_type: "music show",
            location: "Toronto",
            image: blockparty,
            date: "2023-09-28",
            time: "19:30",
            min_price: "150",
            max_price: "750",
            total_tickets: 800,
            tickets_sold: 400,
            is_soldout: false,
            ticket_types: {
              "General Admission": "150",
              Standard: "200",
              Premium: "450",
              "All Access": "750",
            },
          },
        ],
      },
      {
        "Funk Music": [
          {
            title: "Bringing out the Funk in you - With DJ CashVibes",
            event_type: "music show",
            image: premierleague,
            location: "Lagos",
            date: "2023-11-15",
            time: "17:00",
            min_price: "25",
            max_price: "95",
            total_tickets: 1000,
            tickets_sold: 500,
            is_soldout: false,
            ticket_types: {
              "General Admission": "25",
              Standard: "45",
              Premium: "65",
              "All Access": "95",
            },
          },
        ],
      },
    ],
  },
];


const AllLocations = [
  { city: "Abuja", country: "Nigeria", code: "NG" },
  { city: "Arberdeen", country: "Scotland", code: "GB" },
  { city: "Berlin", country: "Genrmany", code: "GR" },
  { city: "Miami", country: "United States of America", code: "US" },
  { city: "London", country: "England", code: "GB" },
  { city: "Toronto", country: "Canada", code: "CN" },
  { city: "Lagos", country: "Nigeria", code: "NG" },
  { city: "Lagos", country: "Portugal", code: "PR" },
  { city: "Sydney", country: "Australia", code: "AU" },
  { city: "Accra", country: "Ghana", code: "GH" },
]

export const EventLocations = AllLocations.sort((a, b) => a.city.localeCompare(b.city));


export const ticketNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]



