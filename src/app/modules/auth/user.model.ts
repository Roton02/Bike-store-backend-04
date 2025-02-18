/* eslint-disable @typescript-eslint/no-unused-vars */
import { model, Schema } from 'mongoose'
import IUser from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  const salt_round = Number(config.BCRYPT_SALT)
  this.password = await bcrypt.hash(this.password, salt_round)
})

userSchema.post('save', async function (doc, next) {
  doc.password = ''
  next()
})

export const user = model<IUser>('user', userSchema)
