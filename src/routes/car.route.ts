import express, { Router } from 'express'
import CarService from '../services/car/car'

const router: Router = express.Router()

// router.get('/getCars', (req, res, next) => CarService.getCars(req, res, next))

router.get('/:userId/:carId', (req, res, next) =>
  CarService.getACar(req, res, next)
)

router.post('/add', (req, res, next) => CarService.addCar(req, res, next))

router.patch('/update', (req, res, next) =>
  CarService.updateCar(req, res, next)
)

router.delete('/delete/:userId/:carId', (req, res, next) =>
  CarService.deleteCar(req, res, next)
)

export default router
