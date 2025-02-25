import config from '../../config'
import AppError from '../../error/AppError'
import IUser, { IloginUser } from './user.interface'
import { user } from './user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createUserIntroDB = async (payload: IUser) => {
  const isExist = await user.findOne({ email: payload.email })
  if (isExist) {
    throw new AppError(400, 'Email already exists')
  }
  payload.role = 'customer'
  const result = await user.create(payload)
  return result
}

const loginUserIntroDB = async (payload: IloginUser) => {
  const UserData = await user
    .findOne({ email: payload.email })
    .select('+password')
  if (!UserData) {
    throw new AppError(401, 'Invalid credentials')
  }
  // console.log(UserData)
  const verifyPassword = await bcrypt.compare(
    payload.password,
    UserData.password
  )

  if (!verifyPassword) {
    throw new AppError(401, 'Invalid credentials')
  }

  const VerifiedUser = {
    _id: UserData._id,
    name: UserData.name,
    email: UserData.email,
    role: UserData.role,
  }

  const secret = config.JWT_SECRET as string

  const token = jwt.sign(VerifiedUser, secret, { expiresIn: '1h' })

  return { token }
}

const blockUsersIntroDB = async (id: string) => {
  const result = await user.findByIdAndUpdate(id, {
    isBlocked: true,
  })
  return result
}

const getAllUserIntroDB = async () => {
  const result = await user.find()
  return result
}
const deleteUserIntroDB = async (id: string) => {
  const result = await user.findByIdAndUpdate(id, { isDelete: true })
  return result
}

export const userServcies = {
  createUserIntroDB,
  loginUserIntroDB,
  blockUsersIntroDB,
  deleteUserIntroDB,
  getAllUserIntroDB,
}
