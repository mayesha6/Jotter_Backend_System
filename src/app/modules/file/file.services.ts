import { File } from "./file.model";
import { User } from "../user/user.model";
import { IFile, FileType } from "./file.interface";
import path from "path";

const createFile = async (userId: string, payload: Partial<IFile>) => {
  if (!payload.name) {
    throw new Error("File name is required");
  }

  // Automatically get the extension as type
  const type = path.extname(payload.name).replace(".", "") || "txt"; // default to txt if no extension

  const file = await File.create({
    user: userId,
    name: payload.name,
    type,                     // inferred from name
    folder: payload.folder || null,
    size: 0,                  // virtual file size
    url: "",                  // virtual file, no URL yet
    content: ""               // initial empty content
  });

  return file;
};

// 2️⃣ Upload a real file (PDF, image, etc.)
const uploadFile = async (
  userId: string,
  payload: { name: string; size: number; folder: string; url: string }
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const storageLimit = 15 * 1024 * 1024 * 1024; // 15GB
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

// 3️⃣ Update virtual file content
const updateVirtualContent = async (
  fileId: string,
  userId: string,
  content: string
) => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) throw new Error("File not found");
  if (file.type !== "virtual")
    throw new Error("Cannot edit content of uploaded file");

  file.content = content;
  file.size = Buffer.byteLength(content, "utf-8"); // update size in bytes
  await file.save();
  return file;
};

// 4️⃣ Get file info
const getFile = async (fileId: string, userId: string) => {
  return File.findOne({ _id: fileId, user: userId });
};

// 5️⃣ Delete file
const deleteFile = async (fileId: string, userId: string) => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) throw new Error("File not found");

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

// 6️⃣ Export virtual file as .txt
const exportFileAsTxt = async (fileId: string, userId: string) => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) throw new Error("File not found");
  if (file.type !== "virtual")
    throw new Error("Cannot export uploaded file as .txt");

  return { name: file.name + ".txt", content: file.content || "" };
};
const getAllFiles = async (userId: string) => {
  return await File.find({ user: userId });
};

const getFilesByType = async (userId: string, type: string) => {
  let filter: Record<string, any> = { user: userId };

  switch (type.toLowerCase()) {
    case "pdf":
      filter.type = "pdf";
      break;
    case "image":
      // common image extensions
      filter.type = { $in: ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"] };
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
      filter.type = type.toLowerCase(); // any other type
      break;
  }

  return await File.find(filter);
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
};
