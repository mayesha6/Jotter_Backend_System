import { File } from "../file/file.model";
import { Folder } from "../folder/folder.model";


const getFoldersByDate = async (userId: string, date: string) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return await Folder.find({
    user: userId,
    createdAt: { $gte: start, $lte: end }
  });
};

const getFilesByDate = async (userId: string, date: string) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return await File.find({
    user: userId,
    createdAt: { $gte: start, $lte: end }
  });
};

const getRecentFilesAndFolders = async (userId: string, limit = 5) => {
  const files = await File.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  const folders = await Folder.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  // merge + sort again
  const combined = [...files, ...folders]
    .sort(
      (a, b) =>
        new Date(b.createdAt!).getTime() -
        new Date(a.createdAt!).getTime()
    )
    .slice(0, limit);

  return combined;
};


export const CalendarServices = {
  getFoldersByDate,
  getFilesByDate,
  getRecentFilesAndFolders
};
