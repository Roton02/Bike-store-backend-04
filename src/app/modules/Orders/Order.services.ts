/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import AppError from '../../error/AppError'
import BikeModel from '../Products/Bikes.model'
import IOrder from './Order.interface'
import OrderModel from './Order.model'

const OrderCreateIntroDB = async (orderData: IOrder) => {
  const productId = orderData.product
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const isExistBike = await BikeModel.findById(productId)
    if (!isExistBike) {
      throw new Error('Product is not found !')
    }
    if (!isExistBike.inStock) {
      throw new Error('insufficient stock !')
    }
    if (isExistBike.quantity <= 0) {
      await BikeModel.findByIdAndUpdate(isExistBike.id, { inStock: false })
      throw new Error('insufficient stock!')
    }
    const cheekQuantity = isExistBike.quantity - orderData.quantity

    if (cheekQuantity < 0) {
      throw new Error('insufficient stock try again !')
    }
    await BikeModel.findByIdAndUpdate(
      productId,
      {
        $inc: { quantity: -orderData.quantity },
      },
      { session }
    )
    // console.log(decrement, 'decrement from bikes collection')
    const result = await OrderModel.create(orderData, { session })
    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(400, error.message)
  }
}

const getAllOrderFromDB = async () => {
  const result = await BikeModel.find()
  return result
}
//complete get specifice data
const getASpeecificeOrderFromDB = async (email: string) => {
  const result = await BikeModel.findById(productId)
  return result
}

//update product
const updateOrderIntroDB = async (productId: string, updateData) => {
  const result = await BikeModel.findByIdAndUpdate(productId, updateData, {
    new: true,
    runValidators: true,
  })
  return result
}

//Delete Data
const deleteOrderFromDB = async (productId: string | null | undefined) => {
  const result = await BikeModel.deleteOne({ _id: productId })
  return result
}

//DONE : multifly value is not correct
// const totalRevenueFromDB = async () => {
//   const result = await OrderModel.aggregate([
//     {
//       $group: {
//         _id: 'null',
//         totalRevenue: { $sum: { $multiply: ['$quantity', '$totalPrice'] } },
//       },
//     },
//     {
//       $project: { totalRevenue: 1, _id: 0 },
//     },
//   ])

//   // console.log(result, 'asdffasdfsdf')
//   return result
// }
export const OrderServices = {
  OrderCreateIntroDB,
  getAllOrderFromDB,
  getASpeecificeOrderFromDB,
  deleteOrderFromDB,
  updateOrderIntroDB,
}
