import { Router } from "express";
import { FolderController } from "./folder.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createFolderZodSchema,
  updateFolderZodSchema,
} from "./folder.validation";

const router = Router();

router.post(
  "/",
  validateRequest(createFolderZodSchema),
  checkAuth(...Object.values(Role)),
  FolderController.createFolder
);
router.get(
  "/",
  checkAuth(...Object.values(Role)),
  FolderController.getAllFolders
);
router.get(
  "/:id",
  checkAuth(...Object.values(Role)),
  FolderController.getFolder
);
router.patch(
  "/:id",
  validateRequest(updateFolderZodSchema),
  checkAuth(...Object.values(Role)),
  FolderController.updateFolder
);
router.delete(
  "/:id",
  checkAuth(...Object.values(Role)),
  FolderController.deleteFolder
);

export const FolderRoutes = router;
