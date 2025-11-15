import { ErrorRequestHandler } from 'express';
import ErrorTypes from '../constants/errorTypes';
import logger from '../config/logger';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errorType = err.errorType || ErrorTypes.SERVER_ERROR;

  if (err.name === 'PrismaClientKnownRequestError') {
    if (err.code === 'P2002') {
      statusCode = 409;
      errorType = ErrorTypes.DUPLICATE;

      const duplicateField = err.meta?.target[0];
      switch (duplicateField) {
        case 'email':
          message = 'Email already used';
          break;
        case 'phone':
          message = 'Phone number already used';
          break;
        default:
          message = 'Duplicate value for a unique field.';
          break;
      }
    }
  }

  logger.error(
    `${req.method} ${req.originalUrl} - ${err.message} ${err.stack}`
  );

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      errorType,
    },
  });
};

export default errorHandler;
