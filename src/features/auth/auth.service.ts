import { injectable } from 'tsyringe';
import { LoginDto, RefreshTokenDto, SignupDto, VerifyEmailDto } from './auth.types';
import AppError from '../../shared/utils/appError';
import ErrorTypes from '../../shared/constants/errorTypes';
import {
  compareHash,
  cryptoHash,
  generateOtp,
  hashString,
  sanitizeUserData,
} from '../../shared/utils/helpers';
import { sendMail } from '../../shared/services/mail.service';
import UserRepository from '../../shared/repositories/user.repository';
import logger from '../../config/logger';
import Database from '../../config/db';
import OtpRepository from '../../shared/repositories/otp.repository';
import { generateAccessToken, generateRefreshToken } from './auth.utils';
import RefreshTokenRepository from '../../shared/repositories/refreshToken.repository';

@injectable()
class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly otpRepo: OtpRepository,
    private readonly db: Database,
    private readonly refreshTokenRepo: RefreshTokenRepository,
  ) {}

  async registerUser(data: SignupDto) {
    const { fullName, email, password } = data;
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      logger.debug("Email already in use");
      throw new AppError('Email already in use', 400, ErrorTypes.DUPLICATE);
    }
    const otpCode = generateOtp();
    const result = await this.db.$transaction(async (txn) => {
      const user = await this.userRepo.create(
        {
          fullName,
          email,
          password: await hashString(password),
        },
        txn
      );

      const otp = await this.otpRepo.create(
        user.id, 
        {
          code: await hashString(otpCode),
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        }, 
        txn
      );

      return { user, otp }
    });

    await sendMail(
      result.user.email,
      'Verify your email',
      `<p>Your OTP is <b>${otpCode}</b></p>`
    );

    const safeUser = sanitizeUserData(result.user);
    return safeUser;
  }

  async createRefreshToken (userId: string) {
    const rawToken = generateRefreshToken(userId);
    const hashedToken =  cryptoHash(rawToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await this.refreshTokenRepo.create(userId, { token: hashedToken, expiresAt});
    return rawToken;
  }

  async veryEmail(data: VerifyEmailDto) {
    const { userId, otp } = data;

    const record = await this.otpRepo.findValidOtp({ userId });
    if(!record) throw new AppError("Verification code expired or not found", 400, ErrorTypes.BAD_REQUEST);

    const isValid = await compareHash(otp, record.code);
    if(!isValid) throw new AppError("Invalid verification code", 400, ErrorTypes.BAD_REQUEST);
    const user = await this.db.$transaction(async (txn) => {
      await this.otpRepo.updateById(record.id, { used: true}, txn);
      return await this.userRepo.updateById(userId, { emailVerified: true }, txn);
    });
    
    const safeUser = sanitizeUserData(user);
    const accessToken = generateAccessToken({ id: userId, email: user.email, role: user.role});
    const refreshToken = await this.createRefreshToken(userId);

    return { safeUser, accessToken, refreshToken }
  }

  async loginUser (data: LoginDto) {
    const { email, password } = data;
    const existingUser = await this.userRepo.findByEmail(email);
    if(!existingUser) throw new AppError("Invalid email or password", 401, ErrorTypes.UNAUTHORIZED);
    if(existingUser.emailVerified === false) {
      throw new AppError("Unverified email, a verification mail has been sent you", 401, ErrorTypes.UNAUTHORIZED);
    }
    const isMatch = await compareHash(password, existingUser.password as string);
    if(!isMatch) throw new AppError("Invalid email or password", 401, ErrorTypes.UNAUTHORIZED);
    const accessToken = generateAccessToken({ id: existingUser.id, email: existingUser.email, role: existingUser.role});
    const refreshToken = await this.createRefreshToken(existingUser.id);
    const safeUser = sanitizeUserData(existingUser);

    return { safeUser, accessToken, refreshToken }
  }

  async refreshToken (data: RefreshTokenDto) {
    const rawToken = data.refreshToken;
    const hashedToken = cryptoHash(rawToken);

    const record = await this.refreshTokenRepo.findByToken(hashedToken);
    if (!record || record.revoked || record.expiresAt < new Date()) {
      throw new AppError("Invalid refresh token", 401, ErrorTypes.UNAUTHORIZED);
    }

    await this.refreshTokenRepo.updateById(record.id, { revoked: true });
    const newRefreshToken = await this.createRefreshToken(record.userId);
    const user = await this.userRepo.findById(record.userId);
    if(!user) throw new AppError("Invalid user Id", 400, ErrorTypes.AUTHENTICATION_ERROR);
   
    const newAccessToken = generateAccessToken({
      id: user?.id,
      email: user?.email,
      role: user?.role,
    });

    return { accessToken: newAccessToken,  refreshToken: newRefreshToken };
  }
}

export default AuthService;
