import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import CarsController from '@/controllers/cars.controller';
import authMiddleware from '@/middlewares/auth.middleware';

class CarRoutes implements Routes {
  public path = '';
  public router = Router();
  public carsController = new CarsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/public/cars`, this.carsController.list);
    this.router.get(`${this.path}/public/cars-by-category`, this.carsController.listByCategory);
    this.router.get(`${this.path}/private/cars`, authMiddleware, this.carsController.list);
  }
}

export default CarRoutes;
