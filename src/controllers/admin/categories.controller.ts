import { CreateTagDto } from '@/dtos/tags.dto';
import { CategoryModel } from '@/models/category.models';
import CategoriesService from '@/services/admin/categories.service';
import { NextFunction, Request, Response } from 'express';

class CategoriesController {
  public categoriesService = new CategoriesService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagData: CreateTagDto = req.body;
      await this.categoriesService.create(tagData);

      res.status(201).json({ message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagId = req.params.id;
      const tagData: CreateTagDto = req.body;
      const updatedCategory: CategoryModel = await this.categoriesService.update(tagId, tagData);

      res.status(200).json({ data: updatedCategory, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagId = req.params.id;
      await this.categoriesService.delete(tagId);

      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagId = req.params.id;
      const category = await this.categoriesService.findOne(tagId);

      res.status(200).json({ data: category });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoriesController;
