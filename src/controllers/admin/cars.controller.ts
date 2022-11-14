import { CreateCarDto } from '@/dtos/cars.dto';
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
}

export default CarsController;
