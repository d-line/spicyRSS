import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import AuthenticationTokenMissingException from "../exceptions/AuthenticationTokenMissingException";
import WrongAuthenticationTokenException from "../exceptions/WrongAuthenticationTokenException";
import DataStoredInToken from "../interfaces/dataStoredInToken";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import userModel from "../users/user.model";

async function authMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction
):Promise<void> {
  const headers = request.headers;
  if (headers && headers.authorization) {
    const secret = process.env.JWT_SECRET;
    const token = headers.authorization.split(" ")[1];
    
    try {
      const verificationResponse = jwt.verify(
        token,
        secret
      ) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userModel.findById(id);
      if (user) {
        // eslint-disable-next-line require-atomic-updates
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
