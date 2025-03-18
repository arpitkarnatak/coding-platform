"use client";

import { ProblemDetail } from "@/types/zod/problem";
import React, { useEffect, useLayoutEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import EditorWindow from "../Editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { RefreshCcw } from "lucide-react";
import useProblemPageStore from "@/lib/store";

export default function SolutionSection({
  problemDetails,
}: {
  problemDetails: ProblemDetail;
}) {
  const { userCode, setUserCode, setResults, examplesResult } =
    useProblemPageStore();
  useLayoutEffect(() => {
    setResults(Array(problemDetails.examples.length).fill(null));
  }, []);

  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={60}>
        <div className="h-full w-full">
          <div>
            <div className="flex w-full border border-1">
              <p>Python</p>
              <button
                onClick={() => setUserCode(problemDetails.boilerplateCode)}
              >
                <RefreshCcw />
              </button>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch(
                      "http://localhost:3000/api/v1/problem/test",
                      {
                        method: "POST",
                        body: JSON.stringify({
                          problemId: problemDetails.id,
                          userCode,
                        }),
                      }
                    ).then(async (res) => res.json());
                    console.log(response);
                    setResults(response.data);
                  } catch (err) {
                    console.error("Error", err);
                  }
                }}
              >
                Run
              </button>
            </div>
          </div>
          <EditorWindow
            language="python"
            boilerplateCode={problemDetails.boilerplateCode}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={40}>
        <Tabs defaultValue="0" className="w-[400px]">
          <TabsList>
            {problemDetails.examples.map((_, index) => (
              <TabsTrigger key={index} value={index.toString()}>
                Testcase {index}
              </TabsTrigger>
            ))}
          </TabsList>
          {problemDetails.examples.map((testcase, index) => (
            <TabsContent
              value={index.toString()}
              key={index}
              className="overflow-scroll"
            >
              <div>
                <p>Input</p>
                <p className="font-bold">{testcase.input}</p>

                <p>Expected Result</p>
                <p>{testcase.output}</p>
                {examplesResult[index] !== null && (
                  <>
                    <p>Your Output</p>
                    {examplesResult[index]?.stdout}
                    <p>Stderr</p>
                    {examplesResult[index]?.stderr}
                  </>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
