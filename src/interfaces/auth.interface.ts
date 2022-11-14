import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export interface DataStoredInToken {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface SignUpResponse {
  user: Partial<User>;
  token: TokenData;
}

export interface LoginResponse {
  user: Partial<User>;
  token: TokenData;
}
