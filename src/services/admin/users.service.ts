import DB from '@/databases';
import { UpdateUserStatusDto } from '@/dtos/users.dto';
import { UserNotFoundError } from '@/errors';
import { UserModel } from '@/models/users.model';

class UserService {
  public users = DB.User;

  public async updateStatus(userId: string, data: UpdateUserStatusDto): Promise<void> {
    const user: UserModel = await this.users.findByPk(userId);
    if (!user) throw new UserNotFoundError();
    if (user.active === +data.status) return;

    await user.update({ active: +data.status });
  }
}

export default UserService;
