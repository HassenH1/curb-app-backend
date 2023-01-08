import express, { Request, Response, NextFunction, Router } from 'express'
import CarService from '../services/car/car'

const router: Router = express.Router()

router.get('/getCars', (req, res, next) => CarService.getCars(req, res, next))

router.get('/:id', (req, res, next) => CarService.getACar(req, res, next))

router.post('/addCar', (req, res, next) => CarService.addCar(req, res, next))

router.delete('/removeCar', (req, res, next) =>
  CarService.deleteCar(req, res, next)
)

router.patch('/updatCar', (req, res, next) =>
  CarService.updateCar(req, res, next)
)

export default router
