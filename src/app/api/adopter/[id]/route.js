//fetch user information
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;
    const adopter = await prisma.adopter.findUnique({
        where: {
            id,
        },
    });
    return NextResponse.json({ adopter }, { status: 200 });
}

// update user information by id
export async function PUT(request, { params }) {
    const { id } = params;
    const data = await request.json();
    const adopter = await prisma.adopter.update({
        where: {
            id,
        },
        data,
    });
    return NextResponse.json({ adopter }, { status: 200 });
}