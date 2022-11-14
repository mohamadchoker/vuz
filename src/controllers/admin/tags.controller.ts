import { CreateTagDto } from '@/dtos/tags.dto';
import TagsService from '@/services/admin/tags.service';
import { NextFunction, Request, Response } from 'express';

class TagsController {
  public tagsService = new TagsService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagData: CreateTagDto = req.body;
      await this.tagsService.create(tagData);

      res.status(201).json({ message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default TagsController;
