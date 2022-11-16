import { CreateTagDto } from '@/dtos/tags.dto';
import { TagNotFoundError } from '@/errors';
import { TagModel } from '@/models/tag.model';
import DB from '@databases';

class TagsService {
  public tags = DB.Tag;

  public async create(tagData: CreateTagDto): Promise<void> {
    await this.tags.create(tagData);
  }

  public async update(tagId: string, tagData: CreateTagDto): Promise<TagModel> {
    const tag: TagModel = await this.tags.findByPk(tagId);
    if (!tag) throw new TagNotFoundError();
    await tag.update(tagData);
    return tag;
  }

  public async delete(tagId: string): Promise<void> {
    const tag: TagModel = await this.tags.findByPk(tagId);
    if (!tag) throw new TagNotFoundError();
    await tag.destroy();
  }

  public async findOne(tagId: string): Promise<TagModel> {
    const tag: TagModel = await this.tags.findByPk(tagId);
    if (!tag) throw new TagNotFoundError();
    return tag;
  }
}

export default TagsService;
