import { NextResponse, NextRequest } from "next/server";
import connectToDB from "../../../../lib/connections";
import Partner from "../../../../Models/partners";
import Ticket from "../../../../Models/tickets";

export const POST = async (req: NextRequest) => {
  const printData = await req.json();
  await connectToDB();

  // Handle Partner Creation
  
  // const partnerName = printData.name;
  // const partnerLocation = printData.location;
  // const partnerExists = await Partner.findOne({ partnerName });
  // if (!partnerExists) {
  //   const newPartner = new Partner({
  //     name: partnerName,
  //     location: partnerLocation,
  //     tickets: printData,
  //   });
  //   try {
  //     await newPartner.save();
  //     console.log("Partner created")
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } else  {
  //   console.log("Partner Already Exists")
  // }

  //Handle Ticket Save
  try {
    const newTicket = new Ticket(printData);
    //Save the prompt in the DB
    await newTicket.save();
    return NextResponse.json(
      { message: "Successfully stored Ticket!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Error creating Ticket" },
      { status: 500 }
    );
  }
  
};
