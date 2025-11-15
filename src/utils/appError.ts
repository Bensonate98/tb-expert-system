class AppError extends Error {
  statusCode: number;
  errorType: string;
  constructor(message: string, statusCode: number, errorType: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.name = 'AppError';

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
