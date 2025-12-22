import { Types } from "mongoose";

export interface IFolder {
  name: string;
  user: Types.ObjectId;
  parentFolder?: Types.ObjectId | null;
  createdAt?: Date;
}