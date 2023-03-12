import { Request, Response, NextFunction } from 'express'
import models from '../../models/model'

class CarService {
  getCars = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('HITTING HERE')
      const cars = await models.Car.find({ userId: req.params.userId })
      console.log('GOT ALL THE CARS AND NOW SENDING!!')
      res.status(200).json({ cars })
    } catch (error) {
      throw new Error(`${error} error getting cars`)
    }
  }
  getACar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      models.User.findOne({ _id: req.params.carId }, (err: any, user: any) => {
        if (err) return res.status(400).json(err)
        const test = user.cars.id(req.params.carId)
        return res.status(200).json(test)
      })
    } catch (error) {
      throw new Error(`${error} error getting a car`)
    }
  }
  addCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addCar = new models.Car({ ...req.body })
      addCar.save((error, data) => {
        if (error) return res.status(500).json({ error })
        return res.status(201).json({ data })
      })
    } catch (error) {
      throw new Error(`${error} adding car`)
    }
  }
  deleteCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.params, '<===waht is parms?')
      models.Car.deleteOne({ _id: req.params.carId })
        .then(() => {
          console.log('delete was successful')
          res.status(200).send('success')
        })
        .catch(() => {
          console.log('delete was not successful')
          res.status(400).send('failed')
        })
    } catch (error) {
      throw new Error(`${error} delete car`)
    }
  }
  updateCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {}
  }
}

const carService = new CarService()
export default carService
