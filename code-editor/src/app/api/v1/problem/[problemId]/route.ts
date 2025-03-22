import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ problemId: string }> }
) {
  const { problemId } = await params;
  const prisma = new PrismaClient();

  const problemFromDb = await prisma.problem.findUnique({
    where: {
      id: problemId,
    },
    include: {
      details: {
        omit: {
          hiddenTests: true,
          runnerCode: true,
        },
      },
    },
  });

  if (!problemFromDb) {
    return NextResponse.json({}, { status: 404 });
  }
  console.log("problem", problemFromDb);
  return NextResponse.json(
    { data: problemFromDb },
    {
      status: 200,
    }
  );
}
