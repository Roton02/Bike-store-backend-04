import { Router } from 'express'
import blogRouter from '../modules/Blog/blog.routes'
import userRouter from '../modules/auth/user.routes'

const router = Router()

const routers = [
  {
    path: '/blogs',
    router: blogRouter,
  },
  {
    path: '/',
    router: userRouter,
  },
]

routers.forEach((route) => router.use(route.path, route.router))

export default router
