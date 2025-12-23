import { Router } from "express";
import { FileController } from "./file.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { FavouriteControllers } from "../favourite/favourite.controller";

const router = Router();

router.post("/", checkAuth(...Object.values(Role)), FileController.createVirtualFile);
router.post("/upload", checkAuth(...Object.values(Role)), FileController.uploadFile);

router.get("/", checkAuth(...Object.values(Role)), FileController.getAllFiles);
router.get("/type/:type", checkAuth(...Object.values(Role)), FileController.getFilesByType);

router.get("/favourites", checkAuth(...Object.values(Role)), FavouriteControllers.getFavouriteFiles);
router.patch("/favourite/:id", checkAuth(...Object.values(Role)), FavouriteControllers.markAsFavourite);
router.patch("/unfavourite/:id", checkAuth(...Object.values(Role)), FavouriteControllers.removeFromFavourite);

router.patch("/:id/content", checkAuth(...Object.values(Role)), FileController.updateContent);
router.get("/:id/export", checkAuth(...Object.values(Role)), FileController.exportFile);

router.get("/:id", checkAuth(...Object.values(Role)), FileController.getFile);
router.delete("/:id", checkAuth(...Object.values(Role)), FileController.deleteFile);

export const FileRoutes = router
