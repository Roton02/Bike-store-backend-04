import mongoose from 'mongoose'

interface IOrder {
  user: mongoose.Types.ObjectId
  product: mongoose.Types.ObjectId
  quantity: number
  totalPrice?: number
  isAproved?: 'Pending' | 'Processing' | 'Shipped' | 'Delivered'
  status?: 'Paid' | 'Failed' | 'Cancelled'
}

export default IOrder

//Delivered  (Pending, Processing, Shipped, Delivered)
