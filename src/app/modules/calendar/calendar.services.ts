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


export const CalendarServices = {
  getFoldersByDate,
  getFilesByDate
};
