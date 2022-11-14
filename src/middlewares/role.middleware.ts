import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { Response, NextFunction } from 'express';

const roleMiddleware = (role: 'user' | 'admin') => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (req.user.role === role) {
      next();
    } else {
      next(new HttpException(403, 'Forbidden'));
    }
  };
};

export default roleMiddleware;
