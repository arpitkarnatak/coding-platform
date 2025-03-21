import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();

  const problems = await prisma.problem.findMany();
  return NextResponse.json({ data: problems }, { status: 200 });
}
