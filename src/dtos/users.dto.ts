import { IsEmailAlreadyExist } from '@/rules/EmailExist.rule';
import { IsString, IsEmail, IsDefined, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsDefined({ message: 'Name is required' })
  @IsString()
  public name: string;

  @IsDefined({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is not valid.' })
  @IsEmailAlreadyExist({ message: 'Email is already exist.' })
  public email: string;

  @IsDefined({ message: 'Password is required' })
  @IsString()
  //@Min(8, { message: 'Password should contains at least 8 characters.' })
  public password: string;
}

export class LoginUserDto {
  @IsDefined({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is not valid.' })
  public email: string;

  @IsDefined({ message: 'Password is required.' })
  @IsString()
  public password: string;
}

export class UpdateUserStatusDto {
  @IsDefined({ message: 'Status is required' })
  @IsBoolean({ message: 'Status should be boolean' })
  public status: boolean;
}
