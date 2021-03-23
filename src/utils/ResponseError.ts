import httpStatus from 'http-status-codes';
import { Response } from 'express';

export const responseErrorJson = (
  res: Response,
  methodName: string,
  errorMessage: string,
  statusCode: number = httpStatus.INTERNAL_SERVER_ERROR,
) => {
  res.status(statusCode);
  console.error(methodName, errorMessage);
  return res.json({
    error: errorMessage,
  });
};
