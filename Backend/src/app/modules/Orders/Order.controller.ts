/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import { OrderServices } from './Order.services'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { JwtPayload } from 'jsonwebtoken'

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const OrderData = req.body
  console.log(OrderData)
  const { order, paymentResponse } =
    await OrderServices.OrderCreateIntroDB(OrderData)
  sendResponse(res, {
    message: 'Order created successfully',
    success: true,
    statusCode: 200,
    data: { order, paymentUrl: paymentResponse.GatewayPageURL },
  })
})

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  // const term = typeof searchTerm === 'string' ? searchTerm : undefined;
  const result = await OrderServices.getAllOrderFromDB()
  sendResponse(res, {
    success: true,
    message: 'Bikes retrieved successfully',
    statusCode: 200,
    data: result,
  })
})

const getSpecificOrder = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user as JwtPayload
  const result = await OrderServices.getASpeecificeOrderFromDB(email)
  sendResponse(res, {
    success: true,
    message: 'Bikes retrieved successfully',
    statusCode: 200,
    data: result,
  })
})

//Complete : update products
const updateProducts = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.orderId
  const { updateStatus } = req.body
  const result = await OrderServices.updateOrderIntroDB(productId, updateStatus)
  sendResponse(res, {
    success: true,
    message: 'BIKE Update successfully',
    statusCode: 200,
    data: result,
  })
})
const deleteBike = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.orderId
  const result = await OrderServices.deleteOrderFromDB(productId)
  sendResponse(res, {
    success: true,
    message: 'bike deleted successfully',
    statusCode: 200,
    data: '',
  })
})

//! totoal revienue [when i next time  update my project then it will be helpful to update]
// const totalrevenue = async (req: Request, res: Response) => {
//   try {
//     const result = await OrderServices.totalRevenueFromDB()
//     res.status(200).json({
//       message: 'Revenue calculated successfully',
//       success: true,
//       data: result[0],
//     })
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.name,
//       error: error,
//       stack: process.env.NODE_ENV === 'production' ? null : error.stack,
//     })
//   }
// }

export const orderController = {
  createOrder,
  getAllOrder,
  getSpecificOrder,
  updateProducts,
  deleteBike,
  // totalrevenue,
}
