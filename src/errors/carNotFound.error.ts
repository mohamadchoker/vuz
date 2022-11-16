import ApplicationError from './ApplicationError';

export class CarNotFoundError extends ApplicationError {
  constructor() {
    super('Car not found', 404);
  }
}

export default CarNotFoundError;
