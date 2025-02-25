/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SSLCommerz from 'sslcommerz-lts'

const store_id = 'abc67bdcd2b854e0'
const store_passwd = 'abc67bdcd2b854e0@ssl'
const is_live = false // true for live, false for sandbox

const sslcommerz = new SSLCommerz(store_id, store_passwd, is_live)

export const initiatePayment = async (order: any) => {
  const data = {
    total_amount: order.totalPrice,
    currency: 'BDT',
    tran_id: order._id,
    success_url: 'http://localhost:5173/api/payment/success',
    fail_url: 'http://localhost:5173/api/payment/fail',
    cancel_url: 'http://localhost:5173/api/payment/cancel',
    ipn_url: 'http://localhost:5173/api/payment/ipn',
    shipping_method: 'NO',
    product_name: order.productName,
    product_category: 'General',
    product_profile: 'general',
    cus_name: order.customerName,
    cus_email: order.customerEmail,
    cus_add1: order.customerAddress,
    cus_city: order.customerCity,
    cus_postcode: order.customerPostcode,
    cus_country: 'Bangladesh',
    cus_phone: order.customerPhone,
    // ...other customer details
  }

  try {
    const response = await sslcommerz.init(data)
    console.log(response)
    return response
  } catch (error: any) {
    throw new Error('SSLCommerz payment initiation failed')
  }
}
