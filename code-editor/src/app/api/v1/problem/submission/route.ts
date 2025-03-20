import prisma from "@/lib/prisma/prisma_utils";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const requestUrl = request.url
    const { searchParams } = new URL(requestUrl)

    const problemId = searchParams.get("problemId");

    if (!problemId) {
        return NextResponse.json({error: "Invalid problem ID"}, {status: 404})
    }

    const submissions = await prisma.submission.findMany({
        where: {
            problemId
        },
        select: {
            id: true,
            code: true,
            createdAt: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    if (!submissions) {
        return NextResponse.json({
            data: []
        })
    }
    
    return NextResponse.json({
        data: submissions
    }, {status: 200})
}