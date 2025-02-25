/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import OrderModel from '../Orders/Order.model'

export const paymentSuccess = async (req: Request, res: Response) => {
  try {
    const { tran_id } = req.body
    const order = await OrderModel.findById(tran_id)
    if (order) {
      order.status = 'Paid'
      await order.save()
      res.status(200).json({ message: 'Payment successful', order })
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const paymentFail = async (req: Request, res: Response) => {
  try {
    const { tran_id } = req.body
    const order = await OrderModel.findById(tran_id)
    if (order) {
      order.status = 'Failed'
      await order.save()
      res.status(200).json({ message: 'Payment failed', order })
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const paymentCancel = async (req: Request, res: Response) => {
  try {
    const { tran_id } = req.body
    const order = await OrderModel.findById(tran_id)
    if (order) {
      order.status = 'Cancelled'
      await order.save()
      res.status(200).json({ message: 'Payment cancelled', order })
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const paymentIpn = async (req: Request, res: Response) => {
  // Handle IPN (Instant Payment Notification) from SSLCommerz
  res.status(200).json({ message: 'IPN received' })
}
