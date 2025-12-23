import { Router } from "express";
import { CalendarController } from "./calendar.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router()

router.get(
  "/folder",
  checkAuth(...Object.values(Role)),
  CalendarController.getFoldersByCalendar
);
router.get(
  "/file",
  checkAuth(...Object.values(Role)),
  CalendarController.getFilesByCalendar
);

export const CalendarRoutes = router;