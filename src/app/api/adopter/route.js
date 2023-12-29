import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(req) {
  const { name, email, phone, address, userId } = await req.json();

  try {
    // Create adopter to database
    const adopter = await prisma.adopter.create({
      data: {
        name,
        email,
        phone,
        address,
        userId,
      },
    });

    return NextResponse.json(
      { data: adopter, message: "Success! Potential Adopter Added" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const adopters = await prisma.adopter.findMany();
    return NextResponse.json({ adopters }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
