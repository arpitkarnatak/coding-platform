"use client";

import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";

interface EditorWindowProps {
  language: "python" | "javascript";
  boilerplateCode: string;
}

export default function EditorWindow(props: EditorWindowProps) {
  const [code, setCode] = useState(props.boilerplateCode);
  return (
    <div className="h-full w-full">
      <div className="w-full border border-1">
        <p>Python</p>
      </div>
      <Editor
        defaultLanguage={props.language}
        height={"100%"}
        width={"100%"}
        value={code}
        theme="vs-dark"
        onChange={(e) => {
          setCode(e ?? "");
        }}
      />
    </div>
  );
}

/*
Problem Consists of:

1. Problem statement
2. Examples: {input, output, explanation}
3. Testcases: [{input, output}]
4. Runner Code





Consists of Boilerplate code
*/
