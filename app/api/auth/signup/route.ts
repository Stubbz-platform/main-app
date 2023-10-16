import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import connectToDB  from "@/lib/connections";
import User from "@/Models/users";


export const POST = async (req: NextRequest) => {
  const { name, email, password } = await req.json();
  await connectToDB();
  const userExists = await User.findOne({ email });
  if (userExists)
    return NextResponse.json(
      { message: "User Already Exisits!" },
      { status: 422 }
    );

  const hashedPassword = await bcrypt.hash(password, 6);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    connectedWallet: false,
  });

  try {
    await newUser.save();
    return NextResponse.json(
      { message: "User Successfully Created" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Error Registering User" },
      { status: 500 }
    );
  }
};