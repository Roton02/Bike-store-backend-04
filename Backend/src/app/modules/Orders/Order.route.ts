import express from 'express'
import { orderController } from './Order.controller'
import auth from '../../middleware/auth'

const OrderRouter = express.Router()

OrderRouter.post('/create-order', auth('customer'), orderController.createOrder)
OrderRouter.get(
  '/get-single-order',
  auth('customer'),
  orderController.getSpecificOrder
)
OrderRouter.get('/get-order', auth('admin'), orderController.getAllOrder)
OrderRouter.patch(
  '/update-order/:orderId',
  auth('admin'),
  orderController.updateProducts
)
OrderRouter.delete(
  '/delete-order/:orderId',
  auth('admin'),
  orderController.deleteBike
)

export default OrderRouter
