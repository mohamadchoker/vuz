import { CreateCategoryDto } from '@/dtos/categories.dto';
import DB from '@databases';

class CategoriesService {
  public categories = DB.Category;

  public async create(categoryData: CreateCategoryDto): Promise<void> {
    await this.categories.create(categoryData);
  }
}

export default CategoriesService;
