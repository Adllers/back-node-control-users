import { Router } from 'express';

import authentication from '../../../../users/infra/http/middlewares/authentication';
import AddressesController from '../controllers/AddressesController';

const addressesRouter = Router();
const addressesController = new AddressesController();


// o middleware de autenticação
addressesRouter.use(authentication);


addressesRouter.post('/', addressesController.create);



export default addressesRouter;