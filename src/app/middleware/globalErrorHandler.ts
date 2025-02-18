/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { TErrorSources } from '../error/Error.interface'
import config from '../config'
import mongoose from 'mongoose'
import ZodErrorHandler from '../error/ZodErrorHandler'
import mongooseErrorHandler from '../error/mongoose.ErrorHandler'
import AppError from '../error/AppError'
import DuplicateIDErrorHandler from './DuplicateIDErrorHandler'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'something went wrong'

  let ErrorSources: TErrorSources = [
    { path: '', message: 'something went wrong' },
  ]
  if (err instanceof ZodError) {
    const simplifiedError = ZodErrorHandler(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    ErrorSources = simplifiedError.ErrorSources
  } else if (err instanceof mongoose.Error.ValidationError) {
    const simplifiedError = mongooseErrorHandler(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    ErrorSources = simplifiedError.ErrorSources
  } else if (err instanceof AppError) {
    const simplifiedError = DuplicateIDErrorHandler(err)
    statusCode = err.statusCode
    message = err.message
    ErrorSources = [
      {
        path: '',
        message: err.message,
      },
    ]
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode: statusCode,
    error: ErrorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  })
}

export default globalErrorHandler
