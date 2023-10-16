import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { CandyPay, verifyWebhookSignature } from "@candypay/checkout-sdk";
import connectToDB from "../../../../lib/connections"
import Ticket from "../../../../Models/tickets";
import { printNft } from "../helpers/printNft";

const sdk = new CandyPay({
  api_keys: {
    private_api_key: process.env.CANDYPAY_PRIVATE_API_KEY!,
    public_api_key: process.env.CANDYPAY_PUBLIC_API_KEY!,
  },
  network: "devnet",
  config: {
    collect_shipping_address: false,
  },
});



// export const POST = async (req: NextRequest) => {
//   console.log("heree");
//   const payload = await req.json();
//   // const signature = req.headers["X-CandyPay-Signature"] as string;
//   const signature = headers().get("X-CandyPay-Signature") as string;
//   const body = await req.text();
//   // const headers = req.headers;
//   console.log(payload, "start");
//   console.log(body, "body");

//   try {
//     await verifyWebhookSignature({
//       payload: JSON.stringify(payload),
//       headers: signature, // as Record<string, string> 
//       webhook_secret: process.env.WEBHOOK_SECRET!,
//     });
//     await connectToDB();
//     const name = payload?.items[0];
//     const tickets = await Ticket.findOne({ name });
//   } catch (err) {
//     return NextResponse.json(
//       { messge: "Error executing webhook signature" },
//       { status: 404 }
//     );
//   }

//   console.log(payload, "end");
//   return NextResponse.json({ message: "Successful Action" }, { status: 201 });
// };
