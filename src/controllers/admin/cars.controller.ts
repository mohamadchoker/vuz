import { CreateCarDto } from '@/dtos/cars.dto';
import { CarModel } from '@/models/car.model';
import CarService from '@/services/admin/cars.service';
import { NextFunction, Request, Response } from 'express';

class CarsController {
  public carsService = new CarService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const carData: CreateCarDto = req.body;
      await this.carsService.create(carData);

      res.status(201).json({ message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const carId = req.params.id;
      const carData: CreateCarDto = req.body;
      const updatedCar: CarModel = await this.carsService.update(carId, carData);

      res.status(200).json({ data: updatedCar, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const carId = req.params.id;
      await this.carsService.delete(carId);

      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const carId = req.params.id;
      const car: CarModel = await this.carsService.findOne(carId);

      res.status(200).json({ data: car, message: 'found' });
    } catch (error) {
      next(error);
    }
  };
}

export default CarsController;
