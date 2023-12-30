import prisma from "@/utils/prisma"
import { NextResponse } from "next/server";
export async function GET(req) {
    // const {content, potential, userid}=await req.json()
    try {
        const story= await prisma.story.findMany() 
        return NextResponse.json({story},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({errorMessage:"Error!"},{status:500})
    }
}
