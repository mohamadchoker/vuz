import { Router } from 'express';
import CarsController from '@controllers/admin/cars.controller';
import { CreateCarDto } from '@dtos/cars.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import roleMiddleware from '@/middlewares/role.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import TagsController from '@/controllers/admin/tags.controller';
import CategoriesController from '@/controllers/admin/categories.controller';
import { CreateTagDto } from '@/dtos/tags.dto';
import { CreateCategoryDto } from '@/dtos/categories.dto';

class AdminRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public carsController = new CarsController();
  public tagsController = new TagsController();
  public categoriesController = new CategoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/cars`,
      authMiddleware,
      roleMiddleware('admin'),
      validationMiddleware(CreateCarDto, 'body'),
      this.carsController.create,
    );
    this.router.post(
      `${this.path}/tags`,
      authMiddleware,
      roleMiddleware('admin'),
      validationMiddleware(CreateTagDto, 'body'),
      this.tagsController.create,
    );
    this.router.post(
      `${this.path}/categories`,
      authMiddleware,
      roleMiddleware('admin'),
      validationMiddleware(CreateCategoryDto, 'body'),
      this.categoriesController.create,
    );
  }
}

export default AdminRoute;
