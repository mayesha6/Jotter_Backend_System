import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { FileService } from "./file.services";
import httpStatus from 'http-status-codes';
import { JwtPayload } from "jsonwebtoken";

// Create virtual doc
const createVirtualFile = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const file = await FileService.createFile(decodedToken.userId, req.body);
  sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Virtual file created successfully",
      data: file,
    });
});

const uploadFile = catchAsync(async (req: Request, res: Response) => {
  const { name, size, folder, url } = req.body;
  const decodedToken = req.user as JwtPayload;
  const file = await FileService.uploadFile(decodedToken.userId, { name, size, folder, url });
  sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "File uploaded successfully",
      data: file,
    });
});

const updateContent = catchAsync(async (req: Request, res: Response) => {
  const { content } = req.body;
  const decodedToken = req.user as JwtPayload;
  const file = await FileService.updateVirtualContent(req.params.id, decodedToken.userId, content);
  sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Content updated successfully",
      data: file,
    });
});

const getFile = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload;
  const file = await FileService.getFile(req.params.id, decodedToken.userId);
  sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "File retrive successfully",
      data: file,
    });
});

const deleteFile = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload;
  const file = await FileService.deleteFile(req.params.id, decodedToken.userId);
  sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "File deleted successfully",
      data: file,
    });
});

const exportFile = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload;
  const file = await FileService.exportFileAsTxt(req.params.id, decodedToken.userId);
  res.setHeader("Content-disposition", `attachment; filename=${file.name}`);
  res.setHeader("Content-Type", "text/plain");
  res.send(file.content);
});

const getAllFiles = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const userId = decodedToken.userId;
  const files = await FileService.getAllFiles(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All files retrieved",
    data: files,
  });
});

const getFilesByType = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const userId = decodedToken.userId;
  const { type } = req.params;

  const files = await FileService.getFilesByType(userId, type as "pdf" | "image");

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `${type.toUpperCase()} files retrieved`,
    data: files,
  });
});

export const FileController = {
  createVirtualFile,
  uploadFile,
  updateContent,
  getFile,
  deleteFile,
  exportFile,
  getAllFiles,
  getFilesByType
};
