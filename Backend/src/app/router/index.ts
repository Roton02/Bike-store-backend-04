import { Router } from 'express'
import userRouter from '../modules/auth/user.routes'
import BikesRouter from '../modules/Products/Bikes.route'
import OrderRouter from '../modules/Orders/Order.route'

const router = Router()

const routers = [
  {
    path: '/',
    router: userRouter,
  },
  {
    path: '/bike',
    router: BikesRouter,
  },
  {
    path: '/order',
    router: OrderRouter,
  },
]

routers.forEach((route) => router.use(route.path, route.router))

export default router
