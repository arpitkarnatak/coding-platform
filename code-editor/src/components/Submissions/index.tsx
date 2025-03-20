import React from "react";

export default async function SubmissionSection({problemId} : {problemId: string}) {
  const submissions = await fetch(`http://localhost:3000/api/v1/problem/submission?problemId=${problemId}`).then(
    async (response) => await response.json()
  );

  if (!submissions.data) {
    return <div>Some error occured</div>;
  }
  return (
    <div className="w-full h-full">
      {submissions.data.map((item) => (
        <div key={item}>{JSON.stringify(item)}</div>
      ))}
    </div>
  );
}
