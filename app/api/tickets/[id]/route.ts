import { NextResponse, NextRequest } from "next/server";
import connectToDB from "../../../../lib/connections";
import Ticket from "../../../../Models/tickets";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  try {
    await connectToDB();
    const ticket = await Ticket.findById(id);
    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    return NextResponse.json("faile to fetch ticket", { status: 200 });
  }
};
