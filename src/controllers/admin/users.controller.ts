import { NextFunction, Request, Response } from 'express';
import { UpdateUserStatusDto } from '@/dtos/users.dto';
import UserService from '@/services/admin/users.service';

class UsersController {
  public userService = new UserService();

  public updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const status: UpdateUserStatusDto = req.body;
      await this.userService.updateStatus(userId, status);

      res.status(200).json({ message: 'User status updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
