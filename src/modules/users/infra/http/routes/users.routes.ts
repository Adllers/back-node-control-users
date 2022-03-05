import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import authentication from '../middlewares/authentication';

const usersController = new UsersController();

const usersRouter = Router();

//cria usuário
usersRouter.post('/', usersController.create);
usersRouter.delete('/', authentication, usersController.delete);

export default usersRouter;