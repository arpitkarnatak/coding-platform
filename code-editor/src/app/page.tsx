import ProblemTag from "@/components/ProblemTag";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/lib/axios";
import { Problem } from "@/types/zod/problem";
import Link from "next/link";

async function fetchProblems(): Promise<Problem[] | void> {
  const response = await api.get("/problems");
  return response.data.data;
}

export default async function Home() {
  const problemSet = await fetchProblems().catch((err) => {
    err;
  });
  if (!problemSet) {
    return <>erro</>;
  }
  return (
    <Card>
      <h1>Problemset</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="w-[100px]">Difficulty</TableHead>
            <TableHead>Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problemSet.map((problem: Problem) => (
            <TableRow key={problem.id}>
              <TableCell className="font-medium">
                <Link href={`/problem/${problem.id}`} className="text-lg">
                  {problem.title}
                </Link>
              </TableCell>
              <TableCell>{problem.difficulty}</TableCell>
              <TableCell className="flex gap-2 w-full">
                {problem.tags.map((tag) => (
                  <ProblemTag content={tag} key={tag} />
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
