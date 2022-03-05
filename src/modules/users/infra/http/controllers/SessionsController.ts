import { Response, Request } from 'express';
import { container } from 'tsyringe';


import AuthenticateUserService from '../../../services/AuthenticateUserService';


// index, show, create, update, delete
export default class SessionsController {

    public async create(request: Request, response: Response): Promise<Response> {

        const { email, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);
    
        const { user, token } = await authenticateUser.execute({
            email,
            password
        });
    
        user.password = 'xxxx-xxxx';
    
        return response.json({user, token}); 

    }

}