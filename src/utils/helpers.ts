import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const hashString = async (value: string): Promise<string> => {
  return await bcrypt.hash(value, 10);
};

export const compareHash = async (value: string, hash: string) => {
  return await bcrypt.compare(value, hash);
};

export const generateOtp = (length: number = 4): string => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

const hiddenFields = ['password', 'googleId'];

export const sanitizeUserData = (user: any) => {
  if (!user) return null;
  const userObj = user.toJSON ? user.toJSON() : { ...user };
  hiddenFields.forEach((field) => delete userObj[field]);
  return userObj;
};

export const cryptoHash = (value: string): string => {
  return crypto.createHash('sha256').update(value).digest('hex');
};
