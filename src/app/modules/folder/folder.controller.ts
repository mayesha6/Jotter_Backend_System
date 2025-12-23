import { Request, Response } from "express";
import { FolderService } from "./folder.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

const createFolder = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const folder = await FolderService.createFolder({
    ...req.body,
    user: decodedToken.userId,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Folder is created successfully",
    data: folder,
  });
});

const getAllFolders = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const folders = await FolderService.getAllFolders(decodedToken.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All folders Retrieved Successfully",
    data: folders,
  });
});

const getFolder = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const folder = await FolderService.getFolder(
    req.params.id,
    decodedToken.userId
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Retrieved a folder successfully",
    data: folder,
  });
});

const updateFolder = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const folder = await FolderService.updateFolder(
    req.params.id,
    decodedToken.userId,
    req.body.name
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Folder updated successfully",
    data: folder,
  });
});

const deleteFolder = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const deletedFolder = await FolderService.deleteFolder(
    req.params.id,
    decodedToken.userId
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Folder deleted successfully",
    data: deletedFolder,
  });
});

export const FolderController = {
  createFolder,
  getAllFolders,
  getFolder,
  updateFolder,
  deleteFolder,
};
