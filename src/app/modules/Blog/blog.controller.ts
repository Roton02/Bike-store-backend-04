/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { blogServices } from './blog.services'
import sendResponse from '../../utils/sendResponse'

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const extractedToken = req.headers.authorization
  const token = (extractedToken as string).split(' ')[1]
  const blogData = req.body
  const result = await blogServices.createBlogIntroDB(blogData, token)
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: 201,
    data: result,
  })
})
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const extractedToken = req.headers.authorization
  const token = (extractedToken as string).split(' ')[1]
  const id = req.params.id
  const blogData = req.body
  const result = await blogServices.updateBlogIntroDB(id, blogData, token)
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: 200,
    data: result,
  })
})
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const extractedToken = req.headers.authorization
  const token = (extractedToken as string).split(' ')[1]
  const id = req.params.id
  const result = await blogServices.deleteBlogIntroDB(id, token)
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: 200,
  })
})
const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.query)
  const result = await blogServices.getAllBlogIntroDB(req.query)
  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: 200,
    data: result,
  })
})

export const blogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlog,
}
