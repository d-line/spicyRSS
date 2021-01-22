import * as bcrypt from 'bcrypt'
import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import UserWithThatEmailAlreadyExistsException from '../middleware/UserWithThatEmailAlreadyExistsException'
import WrongCredentialsException from '../middleware/WrongCredentialsException'
import { DataStoredInToken, TokenData } from '../models/token'
import { User } from '../models/user'
import userModel from '../models/user.model'
import Controller from './controller.interface'

class AuthenticationController implements Controller {
  public path = '/auth';

  public router = express.Router();

  constructor () {
    this.initializeRoutes()
  }

  private initializeRoutes () {
    this.router.post(`${this.path}/register`, this.registration)
    this.router.post(`${this.path}/login`, this.loggingIn)
    this.router.post(`${this.path}/logout`, this.loggingOut)
  }

  private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const userData: User = request.body
    console.table(userData)
    if (!userData.email || !userData.password || userData.email.trim() === '' || userData.password.trim() === '') {
      next(new WrongCredentialsException())
    }
    if (
      await userModel.findOne({ email: userData.email })
    ) {
      next(new UserWithThatEmailAlreadyExistsException(userData.email))
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10)
      const user = await userModel.create({
        ...userData,
        password: hashedPassword
      })
      console.table(user)
      user.password = undefined
      const tokenData = this.createToken(user)
      response.setHeader('Set-Cookie', [this.createCookie(tokenData)])
      response.send(user)
    }
  }

  private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const logInData = request.body
    const user = await userModel.findOne({ email: logInData.email })
    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.password, user.password)
      if (isPasswordMatching) {
        user.password = undefined
        const tokenData = this.createToken(user)
        response.setHeader('Set-Cookie', [this.createCookie(tokenData)])
        response.send(user)
      } else {
        next(new WrongCredentialsException())
      }
    } else {
      next(new WrongCredentialsException())
    }
  }

  private loggingOut = (request: express.Request, response: express.Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0'])
    response.send(200)
  }

  private createCookie (tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`
  }

  private createToken (user: User): TokenData {
    const expiresIn = 60 * 60 // an hour
    const secret = process.env.JWT_SECRET
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id
    }
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    }
  }
}

export default AuthenticationController
