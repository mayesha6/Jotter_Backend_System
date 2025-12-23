import { Folder } from "./folder.model";
import { IFolder } from "./folder.interface";

const createFolder = async (payload: Partial<IFolder>) => {
  return Folder.create(payload);
};

const getAllFolders = async (userId: string) => {
  return Folder.find({ user: userId });
};

const getFolder = async (id: string, userId: string) => {
  return Folder.findOne({ _id: id, user: userId });
};

const updateFolder = async (id: string, userId: string, name: string) => {
  return Folder.findOneAndUpdate(
    { _id: id, user: userId },
    { name },
    { new: true }
  );
};

const deleteFolder = async (id: string, userId: string) => {
  return Folder.findOneAndDelete({ _id: id, user: userId });
};

export const FolderService = {
  createFolder,
  getAllFolders,
  getFolder,
  updateFolder,
  deleteFolder,
};
