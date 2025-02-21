import express from 'express'
import { bikesController } from './Bikes.controller'
import zodValidator from '../../middleware/validator'
import BikeZodValidation from './Bike.validation'
import auth from '../../middleware/auth'
import upload from '../../utils/sendImageCloudinary'

const BikesRouter = express.Router()

BikesRouter.post(
  '/',
  auth('admin'),
  // zodValidator(BikeZodValidation),
  upload.single('file'),
  bikesController.createBike
)
BikesRouter.get('/', bikesController.getAllBikes)
//complete: write  valid controller function
BikesRouter.get('/:productId', bikesController.getSpecificBike)
BikesRouter.patch('/:productId', auth('admin'), bikesController.updateProducts) //  productId
BikesRouter.delete('/:productId', auth('admin'), bikesController.deleteBike)

export default BikesRouter
