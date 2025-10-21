import { Response } from 'express';

const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: Record<string, any>
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
export default successResponse;
