import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import AppError from '../../error/AppError'

// Define the Zod schema
const BikeZodValidation = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .trim(),
  image: z
    .string()
    .nonempty({ message: 'Image is required' }) // Empty string হলে error দেখাবে
    .url({ message: 'Invalid image URL' }) // Image URL হিসেবে ধরবে
    .optional(), // File আসবে বলে এটি পরে সেট করা হবে
  brand: z
    .string({
      required_error: 'Brand is required',
    })
    .trim(),
  price: z
    .number({
      required_error: 'Price is required',
    })
    .min(0, { message: 'Price must be a positive number' }),
  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], {
    errorMap: (issue, ctx) => {
      return { message: `${ctx.data} is not a valid category` }
    },
  }),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .trim(),
  quantity: z
    .number({
      required_error: 'Quantity is required',
    })
    .min(0, { message: 'Quantity must be a non-negative number' }),
  inStock: z.boolean({
    required_error: 'inStock must be a boolean value',
  }),
})

// Export the schema for validation

const validateIBike = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.file) {
    throw new AppError(404, 'File not found')
  }

  // Set file path to req.body.image
  req.body.image = req.file.path

  // Convert necessary fields to proper types
  if (req.body.price) req.body.price = Number(req.body.price)
  if (req.body.quantity) req.body.quantity = Number(req.body.quantity)
  if (req.body.inStock) req.body.inStock = req.body.inStock === 'true'

  // Validate with Zod
  const validationResult = BikeZodValidation.safeParse(req.body)

  if (!validationResult.success) {
    throw new AppError(400, validationResult.error.message)
  }

  next() // যদি সব ঠিক থাকে তাহলে পরের middleware-এ যাবে
}

export default validateIBike
