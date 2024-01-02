//fetch pet information
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;
    const pet = await prisma.pet.findUnique({
        where: {
            id,
        },
    });
    return NextResponse.json({ pet }, { status: 200 });
}

// update pet information by id
export async function PUT(request, { params }) {
    const { id } = params;
    const data = await request.json();
    const pet = await prisma.pet.update({
        where: {
            id,
        },
        data,
    });
    return NextResponse.json({ pet }, { status: 201 });
}

// delete pet information by id
export async function DELETE(request, { params }) {
    const { id } = params;
    const pet = await prisma.pet.delete({
        where: {
            id,
        },
    });
    return NextResponse.json({ pet }, { status: 200 });
}