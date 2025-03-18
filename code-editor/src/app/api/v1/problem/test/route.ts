import prisma from "@/lib/prisma/prisma_utils";
import { ProblemDetail } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { problemId, userCode } = requestBody;

  if (!problemId) {
    return NextResponse.json(
      { message: "Problem ID is required" },
      { status: 400 }
    );
  }

  if (!userCode) {
    return NextResponse.json(
      { message: "User Code can't be empty" },
      { status: 400 }
    );
  }

  const problem: ProblemDetail | null = await prisma.problemDetail.findUnique({
    where: {
      id: problemId,
    },
  });

  if (problem === null) {
    return NextResponse.json(
      { message: "Problem doesn't exist." },
      { status: 400 }
    );
  }

  try {
    const testcases = problem.examples as { input: string; output: string }[];
    const answers = await Promise.allSettled(
      testcases.map((testcase) =>
        fetch(process.env.APPWRITE_FUNCTION_ENDPOINT || "", {
          method: "POST",
          body: JSON.stringify({
            inputFileContents: testcase.input,
            outputFileContents: testcase.output,
            userCode: userCode,
            runnerCode: problem.runnerCode,
          }),
        }).then(async (response) => await response.json())
      )
    );

    return NextResponse.json({ data: answers.map(item => item.status == "fulfilled" && item.value) });
  } catch (err) {}
}


// curl -X POST https://67d9391bb35ea5a1fff5.appwrite.global \
// -H "Content-Type: application/json" \
// -d '{"inputFileContents": "1 4", "outputFileContents": "5", "userCode": "def add_nums(a, b):\n\treturn a + b", "runnerCode": "if __name__ == \"__main__\":\n    try:\n        with open(\"input.txt\", \"r\") as f:\n            input_data = f.read().strip().split()\n            a, b = int(input_data[0]), int(input_data[1])\n        with open(\"expected_output.txt\", \"r\") as f:\n            expected_output = int(f.read().strip())\n        find_sum = timeout(add_nums, 5) # Apply timeout\n        ans = add_nums(a, b)\n        print(ans)\n        assert ans == expected_output, \"Output does not match expected output.\"\n    except TimeoutError:\n        print(\"Function timed out!\")"}'
