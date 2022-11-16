import { CreateTagDto } from '@/dtos/tags.dto';
import { TagModel } from '@/models/tag.model';
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

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagId = req.params.id;
      const tagData: CreateTagDto = req.body;
      const updatedTag: TagModel = await this.tagsService.update(tagId, tagData);

      res.status(200).json({ data: updatedTag, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagId = req.params.id;
      await this.tagsService.delete(tagId);

      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagId = req.params.id;
      const tag = await this.tagsService.findOne(tagId);

      res.status(200).json({ data: tag });
    } catch (error) {
      next(error);
    }
  };
}

export default TagsController;
