import { Request, Response } from 'express'
import { bikesServices } from './Bikes.services'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { cloudinaryImage } from '../../utils/sendImageCloudinary'

const createBike = catchAsync(async (req: Request, res: Response) => {
  const data = JSON.parse(req.body.data)
  if (req.file) {
    console.log('first')
    const imageName = 'roton'
    const path = req.file?.path
    const { secure_url } = (await cloudinaryImage(imageName, path)) as {
      secure_url: string
    }
    data.image = secure_url
  }
  const result = await bikesServices.createBikesIntroDB(data)
  sendResponse(res, {
    success: true,
    message: 'Bike Create successfully',
    statusCode: 200,
    data: result,
  })
})

const getAllBikes = catchAsync(async (req: Request, res: Response) => {
  const { searchTerm } = req.query
  // const term = typeof searchTerm === 'string' ? searchTerm : undefined;
  const result = await bikesServices.getAllBikesFromDb(searchTerm as string)
  sendResponse(res, {
    success: true,
    message: 'Bikes retrieved successfully',
    statusCode: 200,
    data: result,
  })
})

const getSpecificBike = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId
  const result = await bikesServices.getASpeecificeBikeFromDB(productId)
  sendResponse(res, {
    success: true,
    message: 'Bikes retrieved successfully',
    statusCode: 200,
    data: result,
  })
})

//Complete : update products
const updateProducts = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId
  const updateData = req.body
  const result = await bikesServices.updateDataIntroDB(productId, updateData)
  sendResponse(res, {
    success: true,
    message: 'BIKE Update successfully',
    statusCode: 200,
    data: result,
  })
})
const deleteBike = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await bikesServices.deleteDataFromDB(productId)
  sendResponse(res, {
    success: true,
    message: 'bike deleted successfully',
    statusCode: 200,
    data: '',
  })
})

export const bikesController = {
  createBike,
  getAllBikes,
  getSpecificBike,
  updateProducts,
  deleteBike,
}
