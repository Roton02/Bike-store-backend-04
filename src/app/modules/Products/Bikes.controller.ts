/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { bikesServices } from './Bikes.services'
import catchAsync from '../../utils/catchAsync'
// import BikeZodValidation from './Bike.validation'

const createBike = catchAsync(async (req: Request, res: Response) => {
  const body = req.body
  const result = await bikesServices.createBikesIntroDB(body)
  res.status(200).json({
    message: 'Bike created successfully',
    success: true,
    data: result,
  })
})

const getAllBikes = catchAsync(async (req: Request, res: Response) => {
  const { searchTerm } = req.query
  // const term = typeof searchTerm === 'string' ? searchTerm : undefined;
  const result = await bikesServices.getAllBikesFromDb(searchTerm as string)
  //throw an error
  if (result.length > 0) {
    res.status(200).json({
      message: 'Bikes retrieved successfully',
      success: true,
      data: result,
    })
  } else {
    res.status(500).json({
      success: false,
      message: 'data is not found ',
    })
  }
})

const getSpecificBike = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId
  const result = await bikesServices.getASpeecificeBikeFromDB(productId)
  res.status(200).json({
    message: 'Bikes retrieved successfully',
    success: true,
    data: result,
  })
})

//Complete : update products
const updateProducts = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId
  const updateData = req.body
  const result = await bikesServices.updateDataIntroDB(productId, updateData)
  res.status(200).json({
    message: 'Bikes updated successfully',
    success: true,
    data: result,
  })
})
const deleteBike = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await bikesServices.deleteDataFromDB(productId)
  res.status(200).json({
    message: 'Bikes deleted  successfully',
    success: true,
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
