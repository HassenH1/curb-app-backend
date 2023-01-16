import { Request, Response, NextFunction } from 'express'
import User from '../../models/user/user.model'

class Car {
  getACar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      User.findOne({ _id: req.params.userId }, (err: any, user: any) => {
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
      const data = await User.findOne({ _id: req.body._id })
      data?.cars.push({
        licensePlateNumber: req.body.licensePlateNumber,
        carModel: req.body.carModel,
        default: req.body.default || false,
      })

      const updated = await data?.save()
      res.status(200).json(updated?.cars)
    } catch (error) {
      throw new Error(`${error} adding car`)
    }
  }
  deleteCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $pull: { cars: { _id: req.params.carId } } },
        { safe: true, new: true },
        (err, result) => {
          if (err) {
            return res.status(400).json(err)
          }
          return res.status(200).json(result?.cars)
        }
      )
    } catch (error) {
      throw new Error(`${error} delete car`)
    }
  }
  updateCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {}
  }
  // getCars = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //   } catch (error) {}
  // }
}

const CarService = new Car()
export default CarService
