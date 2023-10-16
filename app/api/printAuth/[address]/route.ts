import { NextResponse, NextRequest } from "next/server";
import connectToDB from "../../../../lib/connections"
// import Print from "../../../../Models/print";
import Print from "@/Models/print";

export const GET = async (req: NextRequest, { params }: any) => {
  const address = params.address;
  await connectToDB();
  try {
    const printAuthourity = await Print.findOne({ address: address });
    const dbAddress = printAuthourity.address;
    if (dbAddress === address) {
      return NextResponse.json(dbAddress, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Address Not Allowed To Print!" },
        { status: 422 }
      );
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Error Verifying Address" },
      { status: 500 }
    );
  }
};