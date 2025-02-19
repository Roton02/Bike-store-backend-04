import express from 'express'
import { bikesController } from './Bikes.controller'
import zodValidator from '../../middleware/validator'
import BikeZodValidation from './Bike.validation'
import auth from '../../middleware/auth'

const BikesRouter = express.Router()

BikesRouter.post(
  '/',
  // auth('admin'),
  zodValidator(BikeZodValidation),
  bikesController.createBike
)
BikesRouter.get('/', bikesController.getAllBikes)
//complete: write  valid controller function
BikesRouter.get(
  '/:productId',
  // auth('customer', 'admin'),
  bikesController.getSpecificBike
)
BikesRouter.put('/:productId', auth('admin'), bikesController.updateProducts) //  productId
BikesRouter.delete('/:productId', auth('admin'), bikesController.deleteBike)

export default BikesRouter
