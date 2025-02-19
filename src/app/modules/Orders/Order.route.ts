import express from 'express'
import { orderController } from './Order.controller'

const OrderRouter = express.Router()

OrderRouter.post('/create-order', orderController.createOrder)
OrderRouter.get('/get-order', orderController.totalrevenue)
OrderRouter.patch('/update-order', orderController.totalrevenue)
OrderRouter.delete('/delete-order', orderController.totalrevenue)

export default OrderRouter
