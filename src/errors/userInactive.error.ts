import ApplicationError from './ApplicationError';

class UserInactiveError extends ApplicationError {
  constructor() {
    super('Sorry, your account is inactive', 401);
  }
}

export default UserInactiveError;
