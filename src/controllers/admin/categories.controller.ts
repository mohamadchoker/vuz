import { CreateTagDto } from '@/dtos/tags.dto';
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
}

export default CategoriesController;
