import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { JwtPayload } from "jsonwebtoken";
import { FavouriteServices } from "./favourite.services";

const markAsFavourite = async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload;
    const file = await FavouriteServices.markAsFavourite(req.params.id, decodedToken.userId);
    sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: "File marked as favourite",
          data: file,
        });
};

const removeFromFavourite = async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload;
    const file = await FavouriteServices.removeFromFavourite(req.params.id, decodedToken.userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "File removed from favourite",
      data: file,
    });
};

const getFavouriteFiles = async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload;
    const files = await FavouriteServices.getFavouriteFiles(decodedToken.userId);
    sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: "Favourite files retrieved Successfully",
          data: files,
        });
};

export const FavouriteControllers = {
    markAsFavourite,
    removeFromFavourite,
    getFavouriteFiles
};
