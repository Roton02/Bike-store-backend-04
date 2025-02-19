import mongoose from 'mongoose'

interface IOrder {
  user: mongoose.Types.ObjectId
  product: mongoose.Types.ObjectId
  quantity: number
  totalPrice?: number
}

export default IOrder
