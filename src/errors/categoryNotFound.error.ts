import ApplicationError from './ApplicationError';

export class CategoryNotFoundError extends ApplicationError {
  constructor() {
    super('Category not found', 404);
  }
}

export default CategoryNotFoundError;
