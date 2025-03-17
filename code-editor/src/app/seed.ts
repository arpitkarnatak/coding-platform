const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs
const prisma = new PrismaClient();

// The problem data from your document
const problemSet = [
  {
    id: "two-sum",
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
      "def run_test(input_string):\n lines = input_string.strip().split('\\n')\n array = list(map(int, lines[0].split()))\n target = int(lines[1])\n \n # User will implement find_pairs function\n result = find_pairs(array, target)\n \n # Convert result to string format matching the expected output\n return str(result)",
  },
  {
    id: "binary-search-tree-validate",
    name: "Validate Binary Search Tree",
    description:
      "Determine if a given binary tree is a valid binary search tree (BST). A valid BST is defined as follows: The left subtree of a node contains only nodes with keys less than the node's key. The right subtree of a node contains only nodes with keys greater than the node's key. Both the left and right subtrees must also be binary search trees.",
    examples: [
      {
        input: "2 1 3",
        output: "true",
      },
      {
        input: "5 1 4 null null 3 6",
        output: "false",
      },
      {
        input: "5 4 6 null null 3 7",
        output: "false",
      },
    ],
    hiddenTests: [
      {
        input: "10 5 15 3 7 null 18",
        output: "true",
      },
      {
        input: "10 5 15 null null 6 20",
        output: "false",
      },
    ],
    boilerplateCode:
      "class TreeNode:\n\tdef __init__(self, val=0, left=None, right=None):\n\t\tself.val = val\n\t\tself.left = left\n\t\tself.right = right\n\ndef is_valid_bst(root):\n\tpass",
    runnerCode:
      "def run_test(input_string):\n values = list(map(lambda x: None if x == 'null' else int(x), input_string.strip().split()))\n if not values:\n\treturn 'true'\n \n root = TreeNode(values[0])\n queue = [root]\n i = 1\n while queue and i < len(values):\n\tnode = queue.pop(0)\n\tif i < len(values) and values[i] is not None:\n\t\tnode.left = TreeNode(values[i])\n\t\tqueue.append(node.left)\n\ti += 1\n\tif i < len(values) and values[i] is not None:\n\t\tnode.right = TreeNode(values[i])\n\t\tqueue.append(node.right)\n\ti += 1\n \n result = is_valid_bst(root)\n return str(result).lower()",
  },
  {
    id: "lru-cache",
    name: "LRU Cache Implementation",
    description:
      "Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get(key) - Get the value of the key if the key exists in the cache, otherwise return -1. put(key, value) - Set or insert the value if the key is not already present. When the cache reaches its capacity, it should invalidate the least recently used item before inserting a new item.",
    examples: [
      {
        input:
          "LRUCache 2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nput 4 4\nget 1\nget 3\nget 4",
        output: "[null, null, 1, null, -1, null, -1, 3, 4]",
      },
    ],
    hiddenTests: [
      {
        input: "LRUCache 1\nput 2 1\nget 2\nput 3 2\nget 2\nget 3",
        output: "[null, 1, null, -1, 2]",
      },
      {
        input:
          "LRUCache 3\nput 1 1\nput 2 2\nput 3 3\nput 4 4\nget 4\nget 3\nget 2\nget 1",
        output: "[null, null, null, null, 4, 3, 2, -1]",
      },
    ],
    boilerplateCode:
      "class LRUCache:\n\tdef __init__(self, capacity):\n\t\tpass\n\t\n\tdef get(self, key):\n\t\tpass\n\t\n\tdef put(self, key, value):\n\t\tpass",
    runnerCode:
      "def run_test(input_string):\n lines = input_string.strip().split('\\n')\n parts = lines[0].split()\n capacity = int(parts[1])\n \n cache = LRUCache(capacity)\n results = ['null']\n \n for i in range(1, len(lines)):\n\tparts = lines[i].split()\n\tif parts[0] == 'put':\n\t\tkey = int(parts[1])\n\t\tvalue = int(parts[2])\n\t\tcache.put(key, value)\n\t\tresults.append('null')\n\telif parts[0] == 'get':\n\t\tkey = int(parts[1])\n\t\tresult = cache.get(key)\n\t\tresults.append(str(result))\n \n return str(results)",
  },
  {
    id: "merge-intervals",
    name: "Merge Overlapping Intervals",
    description:
      "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    examples: [
      {
        input: "[[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
      },
      {
        input: "[[1,4],[4,5]]",
        output: "[[1,5]]",
      },
    ],
    hiddenTests: [
      {
        input: "[[1,4],[0,0]]",
        output: "[[0,0],[1,4]]",
      },
      {
        input: "[[1,4],[0,2],[3,5]]",
        output: "[[0,5]]",
      },
    ],
    boilerplateCode: "def merge_intervals(intervals):\n\tpass",
    runnerCode:
      "import json\n\ndef run_test(input_string):\n intervals = json.loads(input_string)\n result = merge_intervals(intervals)\n return json.dumps(result)",
  },
  {
    id: "string-anagrams",
    name: "Find All Anagrams in a String",
    description:
      "Given a string s and a non-empty string p, find all the start indices of p's anagrams in s. Strings consists of lowercase English letters only and the length of both strings s and p will not be larger than 20,100. The order of output does not matter.",
    examples: [
      {
        input: "cbaebabacd\nabc",
        output: "[0, 6]",
      },
      {
        input: "abab\nab",
        output: "[0, 1, 2]",
      },
    ],
    hiddenTests: [
      {
        input: "aaaaaaaaaa\na",
        output: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
      },
      {
        input: "hello\nworld",
        output: "[]",
      },
    ],
    boilerplateCode: "def find_anagrams(s, p):\n\tpass",
    runnerCode:
      "def run_test(input_string):\n lines = input_string.strip().split('\\n')\n s = lines[0]\n p = lines[1]\n result = find_anagrams(s, p)\n return str(result)",
  },
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Process each problem in the problem set
    for (const problem of problemSet) {
      // Create a unique ID for the ProblemDetail
      const detailId = problem.id

      // First create the ProblemDetail
      const problemDetail = await prisma.problemDetail.create({
        data: {
          id: detailId,
          description: problem.description,
          examples: problem.examples,
          hiddenTests: problem.hiddenTests,
          boilerplateCode: problem.boilerplateCode,
          runnerCode: problem.runnerCode,
        }
      });

      // Then create the Problem with reference to the ProblemDetail
      await prisma.problem.create({
        data: {
          id: problem.id,
          title: problem.name,
          difficulty: getDifficultyLevel(problem),
          tags: getTagsForProblem(problem),
          problemDetailId: detailId,
        }
      });

      console.log(`Problem '${problem.name}' added successfully.`);
    }
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Helper function to determine difficulty level
function getDifficultyLevel(problem) {
  if (problem.id === "two-sum" || problem.id === "string-anagrams") {
    return "Easy";
  } else if (problem.id === "binary-search-tree-validate" || problem.id === "merge-intervals") {
    return "Medium";
  } else if (problem.id === "lru-cache") {
    return "Hard";
  }
  
  // Default difficulty
  return "Medium";
}

// Helper function to generate tags based on problem characteristics
function getTagsForProblem(problem) {
  const tags = [];
  
  // Add tags based on problem ID and characteristics
  switch (problem.id) {
    case "two-sum":
      tags.push("Array", "Hash Table");
      break;
    case "binary-search-tree-validate":
      tags.push("Tree", "Depth-First Search", "Binary Search Tree");
      break;
    case "lru-cache":
      tags.push("Design", "Hash Table", "Linked List");
      break;
    case "merge-intervals":
      tags.push("Array", "Sorting");
      break;
    case "string-anagrams":
      tags.push("String", "Hash Table", "Sliding Window");
      break;
  }
  
  return tags;
}

// Run the seeding function
seedDatabase()
  .then(() => {
    console.log('Seeding script completed.');
  })
  .catch((e) => {
    console.error('Seeding script failed:', e);
    process.exit(1);
  });