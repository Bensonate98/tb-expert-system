import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import AppError from '../utils/appError';
import ErrorTypes from '../constants/errorTypes';

const validateRequest =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error)
      throw new AppError(error.message, 400, ErrorTypes.VALIDATION_ERROR);
    req.body = value;
    next();
  };

export default validateRequest;
