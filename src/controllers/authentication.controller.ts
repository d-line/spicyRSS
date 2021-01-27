import * as bcrypt from 'bcrypt';
import express from 'express';
import * as jwt from 'jsonwebtoken';
import { Body, JsonController, Post, Req, Res } from 'routing-controllers';
import UserWithThatEmailAlreadyExistsException from '../middleware/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../middleware/WrongCredentialsException';
import { DataStoredInToken, TokenData } from '../models/token';
import { LoginData, User } from '../models/user';
import userModel from '../models/user.model';

@JsonController()
export class AuthenticationController {
  @Post('/auth/register')
  public async registration (@Body() userData: LoginData, @Res() response: express.Response) {
    if (!userData.email || !userData.password || userData.email.trim() === '' || userData.password.trim() === '') {
      throw new WrongCredentialsException();
    }

    if (await userModel.findOne({ email: userData.email })) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await userModel.create({
        ...userData,
        password: hashedPassword
      });
      console.table(user);
      user.password = undefined;
      const tokenData = this.createToken(user);
      response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
      response.send(user);
    }
  }

  @Post('/auth/login')
  public async loggingIn (@Body() logInData: LoginData, @Res() response: express.Response) {
    const user = await userModel.findOne({ email: logInData.email });
    if (user) {
      console.log(user);
      const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
      if (isPasswordMatching) {
        user.password = undefined;
        const tokenData = this.createToken(user);
        response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        response.send(user);
      } else {
        throw new WrongCredentialsException();
      }
    } else {
      throw new WrongCredentialsException();
    }
  }

  @Post('/auth/logout')
  public loggingOut (@Req() request: express.Request, @Res() response: express.Response) {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.send(200);
  }

  private createCookie (tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  private createToken (user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    };
  }
}
