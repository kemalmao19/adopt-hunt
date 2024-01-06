import prisma from "@/utils/prisma"
import { NextResponse } from "next/server";
export async function GET() {
    try {
        const story= await prisma.story.findMany({
          include: {
            adopter: {
              select: {
                name: true
              },
            },
            pets: {
              select: {
                id: true,
                name: true
              },
            }
          }
        }) 
        return NextResponse.json({story},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Error!"},{status:500})
    }
}

export async function POST(req) {
    const data = await req.json();
  
    try {
      // Create story to database
      const story = await prisma.story.create({
        data
      });
  
      return NextResponse.json(
        { data: story, message: "Success! Potential Story Added" },
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