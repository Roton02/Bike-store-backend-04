import BikeModel from '../Products/Bikes.model'
import IOrder from './Order.interface'
import OrderModel from './Order.model'

const OrderCreateIntroDB = async (orderData: IOrder) => {
  const productId = orderData.product
  const isExistBike = await BikeModel.findOne({ _id: productId })
  // console.log('isExistBike :', isExistBike)

  if (isExistBike) {
    const cheekQuantity = isExistBike.quantity - orderData.quantity
    // console.log(cheekQuantity)
    if (!isExistBike.inStock) {
      throw new Error('insufficient stock !')
    }
    if (isExistBike.quantity === 0) {
      throw new Error('insufficient stock !')
    }
    if (cheekQuantity < 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await BikeModel.findByIdAndUpdate(productId, {
        inStock: false,
      })
      throw new Error('insufficient stock!')
    }

    if (isExistBike && cheekQuantity >= 0) {
      await BikeModel.findByIdAndUpdate(productId, {
        $inc: { quantity: -orderData.quantity },
      })
      // console.log(decrement, 'decrement from bikes collection')
      const result = await OrderModel.create(orderData)
      return result
    }
  }
  // console.log('something is gone a wrong')
  throw new Error('Order is not found !')
  // { success: false, status : 404  , message: 'there are no Product here with is ID ' }
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
const updateOrderIntroDB = async (
  productId: string,
  updateData: UpdateQuery<Partial<IBike>>
) => {
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
