import { Request, Response, NextFunction } from 'express';
import models from '../../models/model';

class CarService {
  getCars = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cars = await models.Car.find({ userId: req.params.userId });
      res.status(200).json({ cars });
    } catch (error) {
      throw new Error(`${error} error getting cars`);
    }
  };
  getACar = (req: Request, res: Response, next: NextFunction) => {
    try {
      models.Car.findOne({ _id: req.params.carId }, (err: any, car: any) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(car);
      });
    } catch (error) {
      throw new Error(`${error} error getting a car`);
    }
  };
  addCar = (req: Request, res: Response, next: NextFunction) => {
    try {
      const addCar = new models.Car({ ...req.body });
      addCar.save((error, data) => {
        if (error) return res.status(500).json({ error });
        return res.status(201).json({ data });
      });
    } catch (error) {
      throw new Error(`${error} adding car`);
    }
  };
  deleteCar = (req: Request, res: Response, next: NextFunction) => {
    models.Car.deleteOne({ _id: req.params.carId })
      .then(() => {
        console.log('delete was successful');
        res.status(200).send('success');
      })
      .catch(() => {
        console.log('delete was not successful');
        res.status(400).send('failed');
      });
  };
  updateCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id, ...rest } = req.body;
      const update = await models.Car.findOneAndUpdate(
        {
          _id: _id,
        },
        { $set: rest },
        { new: true }
      );
      res.status(200).json(update);
    } catch (error) {
      throw new Error(`${error} error updating car`);
    }
  };
}

const carService = new CarService();
export default carService;
