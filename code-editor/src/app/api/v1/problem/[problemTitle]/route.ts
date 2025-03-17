import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { problemTitle: string } }
) {
  // TODO: Return problem object after fetching from database

  return NextResponse.json(
    {
      name: "Array Sum Pairs",
      description:
        "Given an array of integers and a target value, find all pairs of elements in the array that sum to the target value. Return an array of arrays, where each inner array contains a pair of numbers that sum to the target. Each pair should only be included once, and the order of pairs doesn't matter.",
      examples: [
        {
          input: "1 5 6 1 0 1\n6",
          output: "[[1, 5], [0, 6]]",
        },
        {
          input: "3 4 5 6 7\n10",
          output: "[[3, 7], [4, 6]]",
        },
        {
          input: "1 2 3 4\n10",
          output: "[]",
        },
      ],
      hiddenTests: [
        {
          input: "-2 -1 0 1 2 3 4 5\n3",
          output: "[[-2, 5], [-1, 4], [0, 3], [1, 2]]",
        },
        {
          input: "5 5 5 5\n10",
          output: "[[5, 5]]",
        },
      ],
      boilerplateCode: "def find_pairs(array, target):\n\tpass",
      runnerCode:
        "def run_test(input_string):\n    lines = input_string.strip().split('\\n')\n    array = list(map(int, lines[0].split()))\n    target = int(lines[1])\n    \n    # User will implement find_pairs function\n    result = find_pairs(array, target)\n    \n    # Convert result to string format matching the expected output\n    return str(result)",
    },
    {
      status: 200,
    }
  );
}
