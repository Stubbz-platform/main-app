import { NextResponse, NextRequest } from "next/server";
import connectToDB from "../../../lib/connections";
import Ticket from "../../../Models/tickets";


export const GET = async (req: NextRequest, res: NextResponse) => {

  try {
    await connectToDB();
    const tickets = await Ticket.find({});
    return NextResponse.json(tickets, {status: 200})
  } catch (error) {
    return NextResponse.json("Failed to fetch Tickets", { status: 500 });
  }
};