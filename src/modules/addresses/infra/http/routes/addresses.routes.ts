import { Router } from 'express';

import authentication from '../../../../users/infra/http/middlewares/authentication';
import AddressesController from '../controllers/AddressesController';


const addressesRouter = Router();
const addressesController = new AddressesController();


// o middleware de autenticação
addressesRouter.use(authentication);


addressesRouter.post('/', addressesController.create);

addressesRouter.get('/:user_id/my-addresses', addressesController.index);

addressesRouter.put('/update-address/:address_id', addressesController.update);

addressesRouter.delete('/delete-address/:address_id', addressesController.delete);

export default addressesRouter;