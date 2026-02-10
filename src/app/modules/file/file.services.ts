import { File } from "./file.model";
import { User } from "../user/user.model";
import { IFile } from "./file.interface";
import path from "path";
import AppError from "../../errorHelpers/AppError";
import httpStatus from 'http-status-codes';

const createFile = async (userId: string, payload: Partial<IFile>) => {
  if (!payload.name) {
    throw new AppError(httpStatus.FORBIDDEN, "File name is required");
  }

  const type = path.extname(payload.name).replace(".", "") || "txt";

  const file = await File.create({
    user: userId,
    name: payload.name,
    type,
    folder: payload.folder || null,
    size: 0,
    url: "",
    content: "",
  });

  return file;
};

const uploadFile = async (
  userId: string,
  payload: { name: string; size: number; folder: string; url: string }
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(httpStatus.NOT_FOUND,"User not found");

  const storageLimit = 15 * 1024 * 1024 * 1024;
  if ((user.storageUsed || 0) + payload.size > storageLimit) {
    throw new Error("Storage limit exceeded");
  }

  const file = await File.create({
    ...payload,
    user: userId,
    type: "uploaded",
  });

  user.storageUsed = (user.storageUsed || 0) + payload.size;
  await user.save();

  return file;
};

const updateVirtualContent = async (
  fileId: string,
  userId: string,
  content: string
) => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) throw new AppError(httpStatus.NOT_FOUND, "File not found");
  if (file.type !== "virtual")
    throw new Error("Cannot edit content of uploaded file");

  file.content = content;
  file.size = Buffer.byteLength(content, "utf-8"); 
  await file.save();
  return file;
};

const getFile = async (fileId: string, userId: string) => {
  return File.findOne({ _id: fileId, user: userId });
};

const deleteFile = async (fileId: string, userId: string) => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) throw new AppError(httpStatus.NOT_FOUND, "File not found");

  if (file.type === "uploaded") {
    const user = await User.findById(userId);
    if (user) {
      user.storageUsed = (user.storageUsed || 0) - (file.size || 0);
      if (user.storageUsed < 0) user.storageUsed = 0;
      await user.save();
    }
  }

  await file.deleteOne();
  return true;
};

const exportFileAsTxt = async (fileId: string, userId: string) => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) throw new AppError(httpStatus.NOT_FOUND, "File not found");
  if (file.type !== "virtual")
    throw new Error("Cannot export uploaded file as .txt");

  return { name: file.name + ".txt", content: file.content || "" };
};
const getAllFiles = async (userId: string) => {
  return await File.find({ user: userId });
};

const getFilesByType = async (userId: string, type: string) => {
  const filter: Record<string, any> = { user: userId };

  switch (type.toLowerCase()) {
    case "pdf":
      filter.type = "pdf";
      break;
    case "image":
      filter.type = {
        $in: ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"],
      };
      break;
    case "video":
      filter.type = { $in: ["mp4", "mov", "avi", "mkv", "webm"] };
      break;
    case "word":
      filter.type = { $in: ["doc", "docx"] };
      break;
    case "excel":
      filter.type = { $in: ["xls", "xlsx"] };
      break;
    default:
      filter.type = type.toLowerCase();
      break;
  }

  return await File.find(filter);
};

const renameFile = async (fileId: string, userId: string, name: string) => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) throw new AppError(httpStatus.NOT_FOUND , "File not found");

  file.name = name;
  file.type = path.extname(name).replace(".", "") || file.type;

  await file.save();
  return file;
};

const copyFile = async (
  fileId: string,
  userId: string,
  folder?: string
) => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) throw new AppError(httpStatus.NOT_FOUND, "File not found");

  return File.create({
    ...file.toObject(),
    _id: undefined,
    folder: folder || file.folder,
    createdAt: new Date(),
  });
};

const duplicateFile = async (fileId: string, userId: string) => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) throw new AppError(httpStatus.NOT_FOUND, "File not found");

  return File.create({
    ...file.toObject(),
    _id: undefined,
    name: `${file.name} (copy)`,
    createdAt: new Date(),
  });
};

const shareFile = async (
  fileId: string,
  ownerId: string,
  targetUserId: string
) => {
  const file = await File.findOne({ _id: fileId, user: ownerId });
  if (!file) throw new AppError(httpStatus.NOT_FOUND, "File not found");

  file.isShared = true;
  file.sharedWith = [...(file.sharedWith || []) as any, targetUserId];

  await file.save();
  return file;
};



export const FileService = {
  createFile,
  uploadFile,
  updateVirtualContent,
  getFile,
  deleteFile,
  exportFileAsTxt,
  getAllFiles,
  getFilesByType,
  renameFile,
  copyFile,
  duplicateFile,
  shareFile
};
