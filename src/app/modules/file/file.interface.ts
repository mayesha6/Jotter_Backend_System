import { Types } from "mongoose";

export type FileType = "virtual" | "uploaded";

export interface IFile {
  name: string;
  user: Types.ObjectId;
  folder?: Types.ObjectId | null;
  type: FileType | string;
  size?: number;
  url?: string;
  mimeType?: string;
  content?: string;
  createdAt?: Date;
}
