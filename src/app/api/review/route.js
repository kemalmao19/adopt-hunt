import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const review = await prisma.review.findMany({
      include: {
        adopter: {
          select: {
            name: true
          },
        },
        users: {
          select: {
            id: true,
            username: true
          },
        }
      }
    });
    return NextResponse.json({ review }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errorMessage: "Error!" }, { status: 500 });
  }
}

export async function POST(req) {
  const data = await req.json();

  try {
    // Create review to database
    const review = await prisma.review.create({
      data
    });

    return NextResponse.json(
      { data: review, message: "Success! Review Added" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
