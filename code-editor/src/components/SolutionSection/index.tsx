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
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

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
      <ResizablePanel defaultSize={50}>
        <Card className="h-full w-full overflow-scroll p-0">
          <div>
            <div className="flex w-full border border-1 p-2 justify-between">
              <p>Python</p>
              <div className="flex gap-2">
                <Button
                  variant={"secondary"}
                  onClick={() => setUserCode(problemDetails.boilerplateCode)}
                >
                  <RefreshCcw />
                </Button>
                <Button
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
                </Button>
              </div>
            </div>
          </div>
          <EditorWindow
            language="python"
            boilerplateCode={problemDetails.boilerplateCode}
          />
        </Card>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <Card className="h-full w-full overflow-scroll">
          <Tabs defaultValue="test-cases">
            <TabsList className="sticky top-0">
              <TabsTrigger value="test-cases">Test Cases</TabsTrigger>
              <TabsTrigger value="test-results">Test Results</TabsTrigger>
            </TabsList>
            <TabsContent value="test-cases">
              <Tabs defaultValue="0" className="w-full">
                <TabsList className="sticky top-0">
                  {problemDetails.examples.map((_, index) => (
                    <TabsTrigger key={index} value={index.toString()}>
                      Testcase {index}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {problemDetails.examples.map((testcase, index) => (
                  <TabsContent value={index.toString()} key={index}>
                    <div>
                      <h3>Input</h3>
                      <p className="overflow-scroll bg-muted max-h-[120px] px-4 py-2 rounded-xl">
                        {testcase.input}
                      </p>

                      <h3>Expected Result</h3>
                      <p className="overflow-scroll bg-muted max-h-[120px] px-4 py-2 rounded-xl">
                        {testcase.output}
                      </p>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
            <TabsContent value="test-results">
              <Tabs defaultValue="0" className="w-full">
                <TabsList className="sticky top-0">
                  {problemDetails.examples.map((_, index) => (
                    <TabsTrigger key={index} value={index.toString()}>
                      Testcase {index}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </TabsContent>
          </Tabs>
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
