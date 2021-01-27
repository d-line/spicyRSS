import { IsDefined, IsEmail, IsString } from 'class-validator';
import { Request } from 'express';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export class LoginData {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
