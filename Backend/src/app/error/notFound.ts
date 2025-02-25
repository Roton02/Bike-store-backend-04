/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

const notFound = (
  req: Request,
  res: Record<string, any>,
  next: NextFunction
) => {
  return res.status(404).json({
    success: false,
    message: 'API not found ',
  })
}

export default notFound
