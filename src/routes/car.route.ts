import express, { Router, Request, Response, NextFunction } from 'express'
import { authenticateJWT } from '../middlewares/authorize.middleware'
import {
  addCarValidationRules,
  getACarValidationRules,
  updateCarValidationRules,
} from '../middlewares/carValidationRules.middleware'
import validate from '../middlewares/validate.middleware'
import carService from '../services/car/car'

const router: Router = express.Router()

router.get(
  '/:userId',
  authenticateJWT,
  (req: Request, res: Response, next: NextFunction) =>
    // router.get('/getCars/:userId', authenticateJWT, (req, res, next) =>
    carService.getCars(req, res, next)
)

router.get(
  '/:carId',
  authenticateJWT,
  (req: Request, res: Response, next: NextFunction) =>
    carService.getACar(req, res, next)
)

router.post(
  '/add',
  authenticateJWT,
  addCarValidationRules(),
  validate,
  (req: Request, res: Response, next: NextFunction) =>
    carService.addCar(req, res, next)
)

router.patch(
  '/update',
  authenticateJWT,
  updateCarValidationRules(),
  validate,
  (req: Request, res: Response, next: NextFunction) =>
    carService.updateCar(req, res, next)
)

router.delete(
  '/delete/:carId',
  authenticateJWT,
  (req: Request, res: Response, next: NextFunction) =>
    carService.deleteCar(req, res, next)
)

export default router
