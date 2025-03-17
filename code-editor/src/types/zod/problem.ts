import { z } from "zod";

export const ProblemDetailSchema = z.object({
  id: z.string(),
  description: z.string(),
  examples: z
    .object({
      input: z.string(),
      output: z.string(),
    })
    .array(),
  boilerplateCode: z.string(),
});

export const ProblemSchema = z.object({
  id: z.string(),
  title: z.string(),
  difficulty: z.string(),
  tags: z.string().array(),
  details: ProblemDetailSchema,
});

export type Problem = z.infer<typeof ProblemSchema>;
export type ProblemDetail = z.infer<typeof ProblemDetailSchema>;
