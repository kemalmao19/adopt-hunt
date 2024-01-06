import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        reviews: {
          select: {
            content: true,
            adopterId: true,
          },
        },
      },
    });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
