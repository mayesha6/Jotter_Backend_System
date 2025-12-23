import { File } from "../file/file.model";

const markAsFavourite = async (fileId: string, userId: string) => {
    return File.findOneAndUpdate(
        { _id: fileId, user: userId },
        { isFavourite: true },
        { new: true }
    );
};

const removeFromFavourite = async (fileId: string, userId: string) => {
    return File.findOneAndUpdate(
        { _id: fileId, user: userId },
        { isFavourite: false },
        { new: true }
    );
};

const getFavouriteFiles = async (userId: string) => {
    return File.find({ user: userId, isFavourite: true });
};

export const FavouriteServices = {
    markAsFavourite,
    removeFromFavourite,
    getFavouriteFiles,
};
