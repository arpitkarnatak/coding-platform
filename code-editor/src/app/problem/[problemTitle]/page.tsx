import EditorWindow from "@/components/Editor";
import ProblemTag from "@/components/ProblemTag";
import SolutionSection from "@/components/SolutionSection";
import SubmissionSection from "@/components/Submissions";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Problem, ProblemSchema } from "@/types/zod/problem";
import React from "react";

// TODO: Move schemas and validations on type folder
// TODO: Have a separate type for problem and one for problem details

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
    <div className="h-screen p-4">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50} className="p-4">
          <div className="h-full w-full overflow-scroll">
            <h1 className="font-bold">{problem.title}</h1>
            <ProblemTag content={problem.difficulty} />

            <div className="my-4 bg-muted p-4 rounded-xl">
              <p>{problem.details.description}</p>
            </div>
            <h2>Examples</h2>
            <div className="flex flex-col gap-6">
              {problem.details.examples.map((example, index) => (
                <div key={index}>
                  <h3>Testcase - {index}</h3>
                  <h3>Input</h3>
                  <div className="bg-muted p-2 rounded-xl">{example.input}</div>

                  <h3>Output</h3>
                  <div className="bg-muted p-2 rounded-xl">
                    {example.output}
                  </div>
                </div>
              ))}
            </div>
            <h2>Tags</h2>
            <div className="flex flex-wrap w-full gap-2">
              {problem.tags.map((tag) => (
                <ProblemTag key={tag} content={tag} />
              ))}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <SolutionSection problemDetails={problem.details} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
