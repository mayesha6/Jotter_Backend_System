import { Schema, model, Document } from "mongoose";
import { IFolder } from "./folder.interface";

export interface IFolderDoc extends IFolder, Document {}

const folderSchema = new Schema<IFolderDoc>(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    parentFolder: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
  },
  { timestamps: true, versionKey: false }
);

export const Folder = model<IFolderDoc>("Folder", folderSchema);
