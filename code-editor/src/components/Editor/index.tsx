"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import useProblemPageStore from "@/lib/store";

interface EditorWindowProps {
  language: "python" | "javascript";
  boilerplateCode: string;
}

export default function EditorWindow(props: EditorWindowProps) {
  const { userCode, setUserCode } = useProblemPageStore();
  useLayoutEffect(() => {
    setUserCode(props.boilerplateCode);
  }, []);

  return (
    <div className="h-full w-full">

      <Editor
        defaultLanguage={props.language}
        height={"100%"}
        width={"100%"}
        value={userCode}
        theme="vs-dark"
        onChange={(e) => {
          setUserCode(e ?? "");
        }}
      />
    </div>
  );
}
