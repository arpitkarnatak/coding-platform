import api from "@/lib/axios";
import React from "react";

export default async function SubmissionSection({problemId} : {problemId: string}) {
  const submissions =  await api.get(`/problem/submission?problemId=${problemId}`)

  if (!submissions.data) {
    return <div>Some error occured</div>;
  }
  return (
    <div className="w-full h-full">
      {submissions.data.data.map((item) => (
        <div key={item}>{JSON.stringify(item)}</div>
      ))}
    </div>
  );
}
