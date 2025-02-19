import { Router } from 'express'
import userRouter from '../modules/auth/user.routes'
import BikesRouter from '../modules/Products/Bikes.route'

const router = Router()

const routers = [
  {
    path: '/bike',
    router: BikesRouter,
  },
  {
    path: '/',
    router: userRouter,
  },
]

routers.forEach((route) => router.use(route.path, route.router))

export default router
