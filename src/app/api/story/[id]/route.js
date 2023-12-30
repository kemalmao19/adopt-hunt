//fetch story information
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  const story = await prisma.story.findUnique({
    where: {
      id,
    },
  });
  return NextResponse.json({ story }, { status: 200 });
}

// update story information by id
export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  const story = await prisma.story.update({
    where: {
      id,
    },
    data,
  });
  return NextResponse.json({ story }, { status: 200 });
}
