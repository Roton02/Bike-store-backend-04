import { z } from 'zod'

const userValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address'),
  password: z.string({
    required_error: 'Password is required',
  }),
  role: z.enum(['admin', 'user']).default('user'),
  isBlocked: z.boolean().default(false),
})

const loginUserVaidation = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address'),
  password: z.string({
    required_error: 'Password is required',
  }),
})

export const authValidation = { userValidationSchema, loginUserVaidation }
