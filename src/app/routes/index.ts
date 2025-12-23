import { Router } from "express"
import { UserRoutes } from "../modules/user/user.routes"
import { AuthRoutes } from "../modules/auth/auth.routes"
import { OtpRoutes } from "../modules/otp/otp.routes"
import { FolderRoutes } from "../modules/folder/folder.routes"
import { FileRoutes } from "../modules/file/file.routes"
import { CalendarRoutes } from "../modules/calendar/calendar.routes"


export const router = Router()

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/otp",
        route: OtpRoutes
    },
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/folder",
        route: FolderRoutes
    },
    {
        path: "/file",
        route: FileRoutes
    },
    {
        path: "/calendar",
        route: CalendarRoutes
    },

]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

