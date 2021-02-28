import CreateUserDto from "users/user.dto";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import userModel from "./../users/user.model";
import { User, LoginToken } from "users/user.interface";
import TokenData from "interfaces/tokenData.interface";
import DataStoredInToken from "interfaces/dataStoredInToken";
import LogInDto from "../users/logIn.dto";
import WrongCredentialsException from "../exceptions/WrongCredentialsException";
import UserAlreadyExistsException from "../exceptions/UserAlreadyExistsException";

class AuthenticationService {

    public async register(userData: CreateUserDto): Promise<LoginToken> {
        if (await userModel.find()) {
            throw new UserAlreadyExistsException();
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await userModel.create({
            ...userData,
            password: hashedPassword,
        });
        user.password = undefined;
        return  { token: this.createToken(user).token };
    }

    public async login(logInData: LogInDto): Promise<LoginToken> {
        const user: User = await userModel.findOne().lean();
        if (user) {
            const isPasswordMatching = await bcrypt.compare(
                logInData.password,
                user.password
            );
            if (isPasswordMatching) {
                user.password = undefined;
                return { token: this.createToken(user).token };
            } else {
                throw new WrongCredentialsException();
            }
        } else {
            throw new WrongCredentialsException();
        }

    }

    private createToken(user: User): TokenData {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken: DataStoredInToken = {
          _id: user._id,
        };
    
        return {
          expiresIn,
          token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
      }
    
}

export default AuthenticationService;