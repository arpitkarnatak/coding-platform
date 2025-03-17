import EditorWindow from "@/components/Editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";
import { z } from "zod";

const ProblemSchema = z.object({
  name: z.string(),
  description: z.string(),
  examples: z
    .object({
      input: z.string(),
      output: z.string(),
    })
    .array(),
  hiddenTests: z
    .object({
      input: z.string(),
      output: z.string(),
    })
    .array(),
  runnerCode: z.string(),
  boilerplateCode: z.string(),
  // Add other fields as needed
});

// Type inference from the schema
type Problem = z.infer<typeof ProblemSchema>;

async function fetchProblem(problemTitle: string): Promise<Problem> {
  // TODO: Replace w/ Base URL
  const response = await fetch(
    `http://localhost:3000/api/v1/problem/${problemTitle}`
  );

  const data = await response.json();

  // Validate the response data against the schema
  const result = ProblemSchema.safeParse(data);
  if (!result.success) {
    // Handle validation errors
    console.error("API response validation failed:", result.error.format());
    throw new Error("Invalid API response format");
  }

  // Return the validated data
  return result.data;
}
export default async function ProblemPage({
  params,
}: {
  params: Promise<{ problemTitle: string }>;
}) {
  const { problemTitle } = await params;
  // TODO: Replace w/ Base URL
  const problem = await fetchProblem(problemTitle);
  return (
    <div className="h-screen">
      {/* My Problem: {problemTitle} */}
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <h1 className="text-2xl font-bold">{problem.name}</h1>
          <p>{problem.description}</p>
          {problem.examples.map((testcase, index) => (
            <div key={index}>
              <p className="font-bold">{testcase.input}</p>
              <p>{testcase.output}</p>
            </div>
          ))}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="h-full w-full">
            <EditorWindow
              language="python"
              boilerplateCode={problem.boilerplateCode}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
