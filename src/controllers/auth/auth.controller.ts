import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import { LoginResponse, RequestWithUser, SignUpResponse } from '@interfaces/auth.interface';
import AuthService from '@/services/auth/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: SignUpResponse = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginUserDto = req.body;
      const loginData: LoginResponse = await this.authService.login(userData);

      res.status(200).json({ data: loginData });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.status(200).json({ data: logOutUserData });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
