import { Router } from 'express';
import TokenController from '@controllers/TokenController';
import UsersController from '@controllers/UsersController';
import SolicitationController from '@controllers/SolicitationController';
import Authorization from '../middlewares/Authorization';

const routes = Router();

routes.use(Authorization);
routes.post('/token', TokenController.store);

routes.get('/usuarios', UsersController.index);
routes.get('/usuarios/:id', UsersController.show);
routes.post('/usuarios', UsersController.store);
routes.put('/usuarios/:id', UsersController.update);

routes.get('/solicitacao', SolicitationController.index);
routes.get('/solicitacao/:id', SolicitationController.show);
routes.post('/solicitacao', SolicitationController.store);
routes.put('/solicitacao/:id', SolicitationController.update);

export default routes;
