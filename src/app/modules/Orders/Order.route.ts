import express from 'express'
import { orderController } from './Order.controller'

const OrderRouter = express.Router()

OrderRouter.post('/create-order', orderController.createOrder)
OrderRouter.get('/get-single', orderController.getSpecificBike)
OrderRouter.get('/get-order', orderController.getAllOrder)
OrderRouter.patch('/update-order', orderController.updateProducts)
OrderRouter.delete('/delete-order', orderController.deleteBike)

export default OrderRouter
