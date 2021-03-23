import * as yup from 'yup';
import httpStatus from 'http-status-codes';
import { Request, Response } from 'express';
import { responseErrorJson } from '@utils/ResponseError';
import UsersModels from '@models/User';
import UsersServices from '@services/UsersServices';
class UsersController {
  async index(req: Request, res: Response) {
    const { query, params } = req;
    const data = Object.assign(query, params);

    const schema = yup.object().shape({
      limit: yup.number().integer().positive(),
      offset: yup.number().integer().min(0),
      fields: yup.string(),
      ativo: yup.boolean(),
    });

    if (!(await schema.isValid(data)))
      return responseErrorJson(
        res,
        'User::store',
        'Erro de validação',
        httpStatus.BAD_REQUEST,
      );

    const response = await UsersServices.index(data);
    return res.status(200).json(response);
  }

  async show(req: Request, res: Response) {
    const { query, params } = req;
    const data = Object.assign(query, params);

    const schema = yup.object().shape({
      id: yup.number().integer().positive().required(),
      limit: yup.number().integer().positive(),
      offset: yup.number().integer().min(0),
      fields: yup.string(),
      ativo: yup.boolean(),
    });

    if (!(await schema.isValid(data)))
      return responseErrorJson(
        res,
        'User::store',
        'Erro de validação',
        httpStatus.BAD_REQUEST,
      );

    const response = await UsersServices.show(data);
    return res.status(200).json(response);
  }

  async store(req: Request, res: Response) {
    try {
      const { body: data } = req;
      const schema = yup.object().shape({
        nome: yup.string().required(),
        email: yup.string().email().trim().required(),
        senha: yup.string().required(),
        ativo: yup.boolean(),
      });

      if (!(await schema.isValid(data)))
        return responseErrorJson(
          res,
          'User::store',
          'Erro de validação',
          httpStatus.BAD_REQUEST,
        );

      if ((await UsersModels.find({ email: data.email })).length)
        return responseErrorJson(
          res,
          'User::store',
          'Este usuário já existe',
          httpStatus.BAD_REQUEST,
        );

      const response = await UsersServices.store(data);
      return res.status(200).json(response);
    } catch (err) {
      return responseErrorJson(res, 'User::store', err.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { query, params, body } = req;
      
      if (body.ativo) console.log("Sim")
      const user_id = params.id;
      const data = Object.assign(query, body);


      const schema = yup.object().shape({
        nome: yup.string().required(),
        email: yup.string().email().trim().required(),
        senha: yup.string().required(),
        ativo: yup.boolean(),
      });

      if (!(await schema.isValid(data)))
        return responseErrorJson(
          res,
          'User::update',
          'Erro de validação',
          httpStatus.BAD_REQUEST,
        );

      if (!(await UsersModels.find({ _id: user_id })).length)
        return responseErrorJson(
          res,
          'User::update',
          'Este usuário não existe',
          httpStatus.BAD_REQUEST,
        );

      const response = await UsersServices.update(data, user_id);
      return res.status(200).json(response);
    } catch (err) {
      return responseErrorJson(res, 'User::update', err.message);
    }
  }
}

export default new UsersController();
