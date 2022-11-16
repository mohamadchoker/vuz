import { CreateCategoryDto } from '@/dtos/categories.dto';
import { CategoryHasCarsError, CategoryNotFoundError } from '@/errors';
import { CategoryModel } from '@/models/category.models';
import DB from '@databases';

class CategoriesService {
  public categories = DB.Category;

  public async create(categoryData: CreateCategoryDto): Promise<void> {
    await this.categories.create(categoryData);
  }

  public async update(categoryId: string, categoryData: CreateCategoryDto): Promise<CategoryModel> {
    const category: CategoryModel = await this.categories.findByPk(categoryId);
    if (!category) throw new CategoryNotFoundError();
    await category.update(categoryData);
    return category;
  }

  public async delete(categoryId: string): Promise<void> {
    const category: CategoryModel = await this.categories.findByPk(categoryId);
    if (!category) throw new CategoryNotFoundError();
    if ((await category.countCars()) > 0) throw new CategoryHasCarsError();
    await category.destroy();
  }

  public async findOne(categoryId: string): Promise<CategoryModel> {
    const category: CategoryModel = await this.categories.findByPk(categoryId);
    if (!category) throw new CategoryNotFoundError();
    return category;
  }
}

export default CategoriesService;
