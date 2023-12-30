import prisma from "@/utils/prisma"
import { NextResponse } from "next/server";
export async function GET(req) {
    // const {content, potential, userid}=await req.json()
    try {
        const review= await prisma.review.findMany() 
        return NextResponse.json({review},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({errorMessage:"Error!"},{status:500})
    }
}
