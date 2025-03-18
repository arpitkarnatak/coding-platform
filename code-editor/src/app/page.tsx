import ProblemTag from "@/components/ProblemTag";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Problem } from "@/types/zod/problem";
import Link from "next/link";

export default async function Home() {
  const problemSet = await fetch("http://localhost:3000/api/v1/problems").then(
    async (response) => await response.json()
  );
  return (
    <div className="p-4">
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
                <Link href={`/problem/${problem.id}`} className="text-lg">{problem.title}</Link>
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
    </div>
  );
}
