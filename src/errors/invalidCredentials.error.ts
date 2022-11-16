import ApplicationError from './ApplicationError';

class InvalidCredentialsError extends ApplicationError {
  constructor() {
    super('Invalid credentials', 401);
  }
}

export default InvalidCredentialsError;
