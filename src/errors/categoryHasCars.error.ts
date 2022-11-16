import ApplicationError from './ApplicationError';

class CategoryHasCarsError extends ApplicationError {
  constructor() {
    super('You cannot delete a category that has cars', 403);
  }
}
export default CategoryHasCarsError;
