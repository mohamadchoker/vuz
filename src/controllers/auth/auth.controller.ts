import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { LoginResponse, SignUpResponse } from '@interfaces/auth.interface';
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
}

export default AuthController;
