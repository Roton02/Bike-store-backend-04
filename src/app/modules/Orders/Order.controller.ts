/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { OrderServices } from './Order.services'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const OrderData = req.body
  const result = await OrderServices.OrderBikeIntroDB(OrderData)
  sendResponse(res, {
    message: 'Order created successfully',
    success: true,
    statusCode: 200,
    data: result,
  })
})

const totalrevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.totalRevenueFromDB()
    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: result[0],
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name,
      error: error,
      stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    })
  }
}

export const orderController = {
  createOrder,
  totalrevenue,
}
