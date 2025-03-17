import EditorWindow from "@/components/Editor";
import ProblemTag from "@/components/ProblemTag";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Problem, ProblemSchema } from "@/types/zod/problem";
import React from "react";
import { z } from "zod";

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
    <div className="h-screen">
      {/* My Problem: {problemTitle} */}
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <h1 className="text-2xl font-bold">{problem.title}</h1>
          {problem.difficulty}
          <p>{problem.details.description}</p>
          <Tabs defaultValue="0" className="w-[400px]">
            <TabsList>
              {problem.details.examples.map((_, index) => (
                <TabsTrigger key={index} value={index.toString()}>
                  Testcase {index}
                </TabsTrigger>
              ))}
            </TabsList>
            {problem.details.examples.map((testcase, index) => (
              <TabsContent value={index.toString()} key={index}>
                <div>
                  <p className="font-bold">{testcase.input}</p>
                  <p>{testcase.output}</p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <h1>Tags</h1>
          <div className="flex flex-wrap w-full gap-2">
            {problem.tags.map((tag) => (
              <ProblemTag key={tag} content={tag} />
            ))}
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="h-full w-full">
            <EditorWindow
              language="python"
              boilerplateCode={problem.details.boilerplateCode}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
