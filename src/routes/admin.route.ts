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
import UsersController from '@/controllers/admin/users.controller';
import { UpdateUserStatusDto } from '@/dtos/users.dto';

class AdminRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public carsController = new CarsController();
  public tagsController = new TagsController();
  public categoriesController = new CategoriesController();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /* Cars crud routes */
    this.router.post(
      `${this.path}/cars`,
      authMiddleware,
      roleMiddleware('admin'),
      validationMiddleware(CreateCarDto, 'body'),
      this.carsController.create,
    );
    this.router.get(`${this.path}/cars/:id(\\d+)`, authMiddleware, roleMiddleware('admin'), this.carsController.getOne);
    this.router.put(
      `${this.path}/cars/:id(\\d+)`,
      authMiddleware,
      roleMiddleware('admin'),
      validationMiddleware(CreateCarDto, 'body', true),
      this.carsController.update,
    );
    this.router.delete(`${this.path}/cars/:id(\\d+)`, authMiddleware, roleMiddleware('admin'), this.carsController.delete);

    /* Tags crud routes */
    this.router.post(
      `${this.path}/tags`,
      authMiddleware,
      roleMiddleware('admin'),
      validationMiddleware(CreateTagDto, 'body'),
      this.tagsController.create,
    );
    this.router.get(`${this.path}/tags/:id(\\d+)`, authMiddleware, roleMiddleware('admin'), this.tagsController.getOne);
    this.router.put(
      `${this.path}/tags/:id(\\d+)`,
      authMiddleware,
      roleMiddleware('admin'),
      validationMiddleware(CreateTagDto, 'body', true),
      this.tagsController.update,
    );
    this.router.delete(`${this.path}/tags/:id(\\d+)`, authMiddleware, roleMiddleware('admin'), this.tagsController.delete);

    /* Categories crud routes */
    this.router.post(
      `${this.path}/categories`,
      authMiddleware,
      roleMiddleware('admin'),
      validationMiddleware(CreateCategoryDto, 'body'),
      this.categoriesController.create,
    );
    this.router.get(`${this.path}/categories/:id(\\d+)`, authMiddleware, roleMiddleware('admin'), this.categoriesController.getOne);
    this.router.put(
      `${this.path}/categories/:id(\\d+)`,
      authMiddleware,
      roleMiddleware('admin'),
      validationMiddleware(CreateCategoryDto, 'body', true),
      this.categoriesController.update,
    );
    this.router.delete(`${this.path}/categories/:id(\\d+)`, authMiddleware, roleMiddleware('admin'), this.categoriesController.delete);

    /* Users routes */
    this.router.post(
      `${this.path}/users/:id(\\d+)/status`,
      authMiddleware,
      roleMiddleware('admin'),
      validationMiddleware(UpdateUserStatusDto, 'body'),
      this.usersController.updateStatus,
    );
  }
}

export default AdminRoute;
