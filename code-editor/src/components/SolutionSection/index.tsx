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
import { Loader2, RefreshCcw } from "lucide-react";
import useProblemPageStore from "@/lib/store";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import useRunCode from "@/hooks/useRunCode";

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

  const {
    data: runCodeResult,
    isPending: runningCode,
    isError: errorRunningCode,
    isIdle: runCodeIdle,
    mutate: runCode,
  } = useRunCode();

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
                  onClick={() =>
                    runCode({
                      problemId: problemDetails.id,
                      userCode: userCode,
                    })
                  }
                >
                  {runCodeIdle && "Run"}
                  {runningCode && <Loader2 className="animate-spin" />}
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

                      {runCodeResult && (
                        <>
                          <p>Your Output</p>
                          <p className="overflow-scroll bg-muted max-h-[120px] px-4 py-2 rounded-xl">
                            {runCodeResult[index]?.stdout}
                          </p>
                          {runCodeResult[index].stderr && (
                            <>
                              <p>Stderr</p>
                              <p className="overflow-scroll bg-muted max-h-[120px] px-4 py-2 rounded-xl">
                                {runCodeResult[index]?.stderr}
                              </p>
                            </>
                          )}
                        </>
                      )}
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
