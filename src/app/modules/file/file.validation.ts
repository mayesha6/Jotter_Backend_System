import { z } from "zod";

export const createFileZodSchema = z.object({
  name: z.string().min(1, { message: "File name is required" }),
  folder: z.string().optional(),
});

export const uploadFileZodSchema = z.object({
  name: z.string().min(1),
  folder: z.string(),
  size: z.number().positive(),
  url: z.string().url(),
});

export const updateFileZodSchema = z.object({
  name: z.string().min(1).optional(),
  folder: z.string().optional(),
});
