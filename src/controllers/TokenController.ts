import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

class TokenController {
  async store(req: Request, res: Response) {
    const token = jwt.sign({ foo: 'bar' }, 'secret');
    return res.send(token);
  }
}

export default new TokenController();
