import React from "react";

export default function ProblemTag({ content }: { content: string }) {
  return <div className="border border-2 rounded-full w-fit px-2 py-0.5 text-sm">{content}</div>;
}
