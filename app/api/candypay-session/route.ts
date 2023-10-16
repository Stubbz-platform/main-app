import { CandyPay } from "@candypay/checkout-sdk"
import type { NextApiHandler } from "next";
import { NextResponse, NextRequest } from "next/server";
import { CheckoutItemEntity } from "@candypay/checkout-sdk";

const sdk = new CandyPay({
  api_keys: {
    private_api_key: process.env.CANDYPAY_PRIVATE_API_KEY!,
    public_api_key: process.env.CANDYPAY_PUBLIC_API_KEY!,
  },
  network: "mainnet", // use 'mainnet' for prod and 'devnet' for dev environment
  config: {
    collect_shipping_address: false,
  },
});

const handler = async (req: NextRequest, res: NextResponse) => {
  const {price, name, quantity, image, publicKey} = await req.json();
//   console.log(reqData)
  try {
    const response = await sdk.session.create({
      success_url: `${process.env.SITE_URL}/payment/success`,
      cancel_url: `${process.env.SITE_URL}/payment/cancel`,
      // additional SPL tokens, SOL and USDC are the supported tokens by default
      items: [
        {
          name,
          price,
          image,
          quantity
        },
      ],
    });

    return NextResponse.json({ response }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating candypay session" },
      { status: 500 }
    );
  }
};

export { handler as GET, handler as POST };