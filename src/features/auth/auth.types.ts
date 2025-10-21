import { Role } from "../../../prisma/generated/prisma";

export interface SignupDto {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}


export interface VerifyEmailDto {
  userId: string;
  otp: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export interface RefreshTokenDto {
  refreshToken: string
}
