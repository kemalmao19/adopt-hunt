//fetch review information
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  const review = await prisma.review.findUnique({
    where: {
      id,
    },
  });
  return NextResponse.json({ review }, { status: 200 });
}

// update review information by id
export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  const review = await prisma.review.update({
    where: {
      id,
    },
    data,
  });
  return NextResponse.json({ review }, { status: 200 });
}
