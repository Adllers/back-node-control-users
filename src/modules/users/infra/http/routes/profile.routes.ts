import { Router } from 'express';

import authentication from '../middlewares/authentication';
import ProfileController from '../controllers/ProfileController';

const profileController = new ProfileController();

const profileRouter = Router();

// passando o middleware de autenticação para todas as rotas abaixo
profileRouter.use(authentication);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;