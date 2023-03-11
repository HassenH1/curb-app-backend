import express, { Router, Request, Response, NextFunction } from 'express'
import {
  addCarValidationRules,
  getACarValidationRules,
} from '../middlewares/carValidationRules.middleware'
import validate from '../middlewares/validate.middleware'
import carService from '../services/car/car'

const router: Router = express.Router()

router.get('/getCars', (req, res, next) => carService.getCars(req, res, next))

router.get('/:carId', (req: Request, res: Response, next: NextFunction) =>
  carService.getACar(req, res, next)
)

router.post(
  '/add',
  addCarValidationRules(),
  validate,
  (req: Request, res: Response, next: NextFunction) =>
    carService.addCar(req, res, next)
)

router.patch('/update', validate, (req, res, next) =>
  carService.updateCar(req, res, next)
)

router.delete(
  '/delete/:carId',
  (req: Request, res: Response, next: NextFunction) =>
    carService.deleteCar(req, res, next)
)

export default router
