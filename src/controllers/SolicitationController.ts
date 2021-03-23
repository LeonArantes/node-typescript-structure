import * as yup from 'yup';
import httpStatus from 'http-status-codes';
import { Request, Response } from 'express';
import { responseErrorJson } from '@utils/ResponseError';
import UsersModels from '@models/User';
import SolicitationServices from '@services/SolicitationsServices';

class SolicitationController {
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
      'Solicitation::store',
      'Erro de validação',
      httpStatus.BAD_REQUEST,
    );

    const response = await SolicitationServices.index(data);
    return res.status(200).json(response);
  }

  async show(req: Request, res: Response) {
    const { query, params } = req;
    const data = Object.assign(query, params);
    
    return res.json(data);
  }

  async store(req: Request, res: Response) {
    const { body: data } = req;

    if (!(await UsersModels.find({ _id: data.user })).length) 
      return responseErrorJson(
        res,
        'User::store',
        'Este usuário não existe',
        httpStatus.BAD_REQUEST,
      );

    const schema = yup.object().shape({
      user: yup.number().required(),
      category: yup.string().required(),
      protocol: yup.number().required(),
      description: yup.string().required(),
      image: yup.string().required(),
      address: yup.object().shape({
        city: yup.string(),
        state: yup.string(),
        street: yup.string(),
        number: yup.number(),
        district: yup.string(),
        zip_code: yup.string(),
        latitude: yup.string(),
        longitude: yup.string(),
      }),

      status: yup.array().of(
        yup.object().shape({
          date: yup.date(),
          type_status: yup.number().required(),
          description: yup.string(),
        }),
      ),
      comments: yup.array().of(
        yup.object().shape({
          date: yup.date(),
          comment: yup.string().required(),
          user: yup.number().required(),
        }),
      ),
      date: yup.date().required(),
      ativo: yup.boolean().default(false),
    });

    if (!(await schema.isValid(data)))
      return responseErrorJson(
        res,
        'Solicitation::store',
        'Erro de validação',
        httpStatus.BAD_REQUEST,
      );
    
      

    const response = await SolicitationServices.store(data);
    return res.status(200).json(response);
  }

  async update(req: Request, res: Response) {
    return responseErrorJson(res, 'Post::update', 'Error');
  }
}

export default new SolicitationController();
