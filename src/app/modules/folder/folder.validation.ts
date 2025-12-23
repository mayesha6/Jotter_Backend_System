import { z } from "zod";

export const createFolderZodSchema = z.object({
  name: z.string().min(1, { message: "Folder name is required" }),
  parentFolder: z.string().optional(),
});

export const updateFolderZodSchema = z.object({
  name: z.string().min(1).optional(),
});