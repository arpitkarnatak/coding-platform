import prisma from "@/lib/prisma/prisma_utils";
import { NextResponse } from "next/server";

export async function GET() {
  const problems = await prisma.problem.findMany();
  return NextResponse.json({ data: problems }, { status: 200 });
}
