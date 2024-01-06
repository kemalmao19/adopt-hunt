//fetch user information
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  const user = await prisma.user.findUnique({
    include: {
      reviews: {
        select: {
          content: true,
          adopterId: true,
        },
      },
    },
    where: {
      id,
    },
  });
  return NextResponse.json({ user }, { status: 200 });
}

// update user information by id
export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return NextResponse.json({ user }, { status: 200 });
}
