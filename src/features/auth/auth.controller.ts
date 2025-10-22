import { Request, Response, NextFunction } from 'express';
import { LoginDto, RefreshTokenDto, SignupDto, VerifyEmailDto, } from './auth.types';
import successResponse from '../../shared/utils/apiResponse';
import { injectable } from 'tsyringe';
import AuthService from './auth.service';
import logger from '../../config/logger';

@injectable()
class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const userData: SignupDto = req.body;
    try {
      const user = await this.authService.registerUser(userData);
      logger.info("User registration successful");
      successResponse(
        res,
        201,
        'User registered successfully, check your email for OTP',
        user
      );
    } catch (err) {
      next(err);
    }
  }

  verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    const data: VerifyEmailDto = req.body;
    try {
      const { safeUser, accessToken, refreshToken } = await this.authService.veryEmail(data);
      logger.info("Email verified");
      successResponse(res, 200, "Email verified successfully", { accessToken, refreshToken, user: safeUser });
    }
    catch(err){
      next(err);
    }
  }

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const userData: LoginDto = req.body;
    try {
      const { safeUser, accessToken, refreshToken } = await this.authService.loginUser(userData);
      logger.info("Login successful");
      successResponse(res, 200, "Login successful", { accessToken, refreshToken, user: safeUser });
    }
    catch(err){
      next(err);
    }
  }

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const token: RefreshTokenDto = req.body;
    try {
      const newTokens = await this.authService.refreshToken(token);
      logger.info("New tokens issued");
      successResponse(res, 200, "Tokens refreshed successfully", newTokens);
    }
    catch(err){
      next(err);
    }
  }
  
}


export default AuthController;