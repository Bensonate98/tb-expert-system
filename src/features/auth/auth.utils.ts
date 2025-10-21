import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JwtPayload } from './auth.types';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../../config/env';

export const encryptPassword = async (password: string): Promise<string> => {
  const saltRounds: number = 11;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePassword = (password: string, hashedPassword: string) =>
  bcrypt.compare(password, hashedPassword);

export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_ACCESS_SECRET as string, { expiresIn: '15m' });
};

export const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, JWT_REFRESH_SECRET as string, { expiresIn: '7d' });
};
