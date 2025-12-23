// folder.controller.ts
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { CalendarServices } from "./calendar.services";

const getFoldersByCalendar = catchAsync(async (req: Request, res: Response) => {
  const { date } = req.query;
  const user = req.user as JwtPayload;

  const folders = await CalendarServices.getFoldersByDate(
    user.userId,
    date as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Folders fetched by calendar date",
    data: folders
  });
});

const getFilesByCalendar = catchAsync(async (req, res) => {
  const { date } = req.query;
  const user = req.user as JwtPayload;

  const files = await CalendarServices.getFilesByDate(
    user.userId,
    date as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Files fetched by calendar date",
    data: files
  });
});

export const CalendarController = {
  getFoldersByCalendar,
  getFilesByCalendar
};
