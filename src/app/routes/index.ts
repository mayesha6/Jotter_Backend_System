import { Router } from "express"


export const router = Router()

const moduleRoutes = [
    {
        path: "/path",
        route: routes
    }

]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

