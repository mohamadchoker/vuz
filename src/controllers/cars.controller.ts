import { CarRepository } from '@/repositories/cars.repository';
import CarService from '@/services/cars.service';
import { NextFunction, Request, Response } from 'express';

class CarsController {
  public carService = new CarService(new CarRepository());

  public list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check if user is authenticated
      const isPrivate = req.path.includes('private');
      const cars = await this.carService.listCars(req.query as any, isPrivate);
      res.status(200).json({ data: cars });
    } catch (error) {
      next(error);
    }
  };

  public listByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cars = await this.carService.listCarsByCategory();
      res.status(200).json({ data: cars });
    } catch (error) {
      next(error);
    }
  };
}

export default CarsController;
