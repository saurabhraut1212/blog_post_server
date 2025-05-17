import { z } from "zod";

export const blogSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
  }),
});

export const blogUpdateSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
});
