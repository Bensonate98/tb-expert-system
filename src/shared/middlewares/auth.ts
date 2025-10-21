import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError";
import ErrorTypes from "../constants/errorTypes";
import { JWT_ACCESS_SECRET } from "../../config/env";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Unauthorized: No token provided", 401, ErrorTypes.UNAUTHORIZED);
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    throw new AppError("Invalid or expired token", 401, ErrorTypes.UNAUTHORIZED);
  }
};

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Unauthorized", 401, ErrorTypes.UNAUTHORIZED));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError("Forbidden: Access denied", 403, ErrorTypes.FORBIDDEN));
    }

    next();
  };
}
