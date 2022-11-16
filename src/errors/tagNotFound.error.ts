import ApplicationError from './ApplicationError';

export class TagNotFoundError extends ApplicationError {
  constructor() {
    super('Tag not found', 404);
  }
}

export default TagNotFoundError;
