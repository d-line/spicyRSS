import * as express from "express";
import { LoginToken } from "users/user.interface";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import CreateUserDto from "../users/user.dto";
import LogInDto from "../users/logIn.dto";
import AuthenticationService from "./authentication.service";

class AuthenticationController implements Controller {
  public path = "/auth";
  public router = express.Router();
  private authenticationService = new AuthenticationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.registration
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.loggingIn
    );
    this.router.post(`${this.path}/logout`, this.loggingOut);
  }

  private registration = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const userData: CreateUserDto = request.body;
    try {
      const token: LoginToken = await this.authenticationService.register(
        userData
      );
      response.send(token);
    } catch (err) {
      next(err);
    }
  };

  private loggingIn = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const logInData: LogInDto = request.body;
    try {
      const token: LoginToken = await this.authenticationService.login(logInData);
      response.send(token);
    } catch (err) {
      next(err);
    }
  };

  private loggingOut = (
    request: express.Request,
    response: express.Response
  ) => {
    response.send(200);
  };
}

export default AuthenticationController;
