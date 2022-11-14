import { CreateTagDto } from '@/dtos/tags.dto';
import DB from '@databases';

class TagsService {
  public tags = DB.Tag;

  public async create(tagData: CreateTagDto): Promise<void> {
    await this.tags.create(tagData);
  }
}

export default TagsService;
