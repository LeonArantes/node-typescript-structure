import httpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ success: false, error: 'Credenciais Inválidas' });
  } else {
    jwt.verify(authorization, 'secret', err => {
      if (err) {
        res
          .status(httpStatus.UNAUTHORIZED)
          .json({ success: false, error: 'Credenciais Inválidas' });
      } else {
        next();
      }
    });
  }
};
