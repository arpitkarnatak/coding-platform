const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid"); // For generating unique IDs
const prisma = new PrismaClient();

// The problems dataset
// This script is run with "npm run seed-db" to fill the database with list of problems.
const problemSet = [
  {
    id: "simple-sum",
    name: "Add two numbers",
    description: "You're given two numbers, find the sum of those two numbers.",
    examples: [
      {
        input: "1 4",
        output: "5",
      },
      {
        input: "4 90",
        output: "94",
      },
    ],
    hiddenTests: [
      {
        input: "5 -19",
        output: "-14",
      },
    ],
    boilerplateCode: "def add_nums(a,b):\n\tpass",
    difficulty: "Easy",
    tags: ["Arithematic", "Operators"],
    runnerCode:
      'if __name__ == "__main__":\n    try:\n        with open("input.txt", "r") as f:\n            input_data = f.read().strip().split()\n            a, b = int(input_data[0]), int(input_data[1])\n        with open("expected_output.txt", "r") as f:\n            expected_output = int(f.read().strip())\n        find_sum = timeout(add_nums, 5) # Apply timeout\n        ans = add_nums(a, b)\n        print(ans)\n        assert ans == expected_output, "Output does not match expected output."\n    except TimeoutError:\n        print("Function timed out!")',
  },
  {
    id: "house-robber",
    name: "House Robber",
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.`,
    examples: [
      { input: "1 2 3 1", output: "4" },
      { input: "2 7 9 3 1", output: "12" },
    ],
    hiddenTests: [{ input: "1 2 3 1", output: "4" }],
    difficulty: "Medium",
    tags: ["Dynamic Programming", "Recursion"],
    boilerplateCode: "def house_robber(nums):\n\tpass",
    runnerCode:
      'if __name__ == "__main__":\n    try:\n        with open("input.txt", "r") as f:\n            input_data = f.read().strip().split()\n            nums = [int(x) for x in input_data]\n        with open("expected_output.txt", "r") as f:\n            expected_output = int(f.read().strip())\n        house_rob = timeout(house_robber, 5) # Apply timeout\n        ans = house_rob(nums)\n        print(ans)\n        assert ans == expected_output, "Output does not match expected output."\n    except TimeoutError:\n        print("Function timed out!")',
  },
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Process each problem in the problem set
    for (const problem of problemSet) {
      // Create a unique ID for the ProblemDetail
      const detailId = problem.id;

      // First create the ProblemDetail
      const problemDetail = await prisma.problemDetail.create({
        data: {
          id: detailId,
          description: problem.description,
          examples: problem.examples,
          hiddenTests: problem.hiddenTests,
          boilerplateCode: problem.boilerplateCode,
          runnerCode: problem.runnerCode,
        },
      });

      // Then create the Problem with reference to the ProblemDetail
      await prisma.problem.create({
        data: {
          id: problem.id,
          title: problem.name,
          difficulty: problem.difficulty,
          tags: problem.tags,
        },
      });

      console.log(`Problem '${problem.name}' added successfully.`);
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
seedDatabase()
  .then(() => {
    console.log("Seeding script completed.");
  })
  .catch((e) => {
    console.error("Seeding script failed:", e);
    process.exit(1);
  });
