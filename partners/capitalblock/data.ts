import earlyImage from "./pics/early.png";
import earlyJson from "./jsons/early.json";

import premiumImage from "./pics/premium.png";
import premiumJson from "./jsons/premium.json";

import tableof5Image from "./pics/table_for_5.png";
import tableof5Json from "./jsons/tableof5.json";

import tableof10Image from "./pics/table_for_10.png";
import tableof10Json from "./jsons/tableof10.json";

export const CapitalBlockMintData = {
  name: "Capital Block Party X Omah Lay!",
  location: "Abuja",
  eventType: "night party",
  dateTime: "2023-10-20T20:00:00",
  //   tokens: ["dust", "samo"],
  tickets: [
    {
      ticketClass: "Table of 10",
      name: "Capital Block Party X OMah Lay! - Table of 10",
      publickKey: "",
      image: tableof10Image,
      metadata: tableof10Json,
      quantity: 40,
      fee: 5,
      price: 0.4,
    },
    {
      ticketClass: "Table Of 5",
      publickKey: "",
      image: tableof5Image,
      metadata: tableof5Json,
      quantity: 50,
      fee: 5,
      price: 0.3,
    },
    {
      ticketClass: "Premium",
      publickKey: "",
      image: premiumImage,
      metadata: premiumJson,
      quantity: 55,
      fee: 5,
      price: 0.2,
    },
    {
      ticketClass: "Early Birds",
      publickKey: "",
      image: earlyImage,
      metadata: earlyJson,
      quantity: 100,
      fee: 5,
      price: 0.1,
    },
  ],
};

export const CapitalBlockGeneralData = {
  name: "Capital Block Party",
  locations: ["Abuja"],
};
