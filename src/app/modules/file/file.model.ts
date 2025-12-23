import { Schema, model, Document } from "mongoose";
import { IFile } from "./file.interface";

export interface IFileDoc extends Omit<IFile, "_id">, Document {}

const fileSchema = new Schema<IFileDoc>(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    folder: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
    type: { type: String, required: true },
    content: { type: String, default: "" },
    size: { type: Number, default: 0 },
    url: { type: String, default: "" },
    isFavourite: { type: Boolean, default: false },
    isShared: { type: Boolean, default: false },
    sharedWith: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true, versionKey: false }
);

export const File = model<IFileDoc>("File", fileSchema);
