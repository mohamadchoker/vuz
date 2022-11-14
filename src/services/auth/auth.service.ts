import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import DB from '@databases';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, LoginResponse, SignUpResponse, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import MailService from '@/mail/mail.service';

class AuthService {
  public users = DB.User;
  public mailService = new MailService();

  public async signup(userData: CreateUserDto): Promise<SignUpResponse> {
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, role: 'user', password: hashedPassword });
    // remove password from response
    createUserData.password = undefined;
    const tokenData = this.createToken(createUserData);

    // should fire an event to send email to a mailing microservice (sns, sqs, kafka, etc)
    await this.mailService.sendEmail(createUserData.email, 'Welcome to the club!', 'welcome');

    return { user: createUserData, token: tokenData };
  }

  public async login(userData: LoginUserDto): Promise<LoginResponse> {
    const findUser: User = await this.users.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(422, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(401, 'Invalid Credentials');
    findUser.password = undefined;
    const tokenData = this.createToken(findUser);

    return { user: findUser, token: tokenData };
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id, name: user.name, email: user.email, role: user.role };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}

export default AuthService;
