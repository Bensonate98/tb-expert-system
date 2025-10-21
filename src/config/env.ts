import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT!;
export const NODE_ENV = process.env.NODE_ENV!;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET!;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET!;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD!;
export const MAIL_HOST = process.env.MAIL_HOST!;
export const MAIL_USER = process.env.MAIL_USER!;
export const MAIL_PORT = process.env.MAIL_PORT!;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY!;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET!;
