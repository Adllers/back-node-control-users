import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '../../../../users/services/CreateUserService';


// index, show, create, update, delete
export default class UsersController {

    public async create(request: Request, response: Response): Promise<Response> {
    
        const { name, email, password } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            email,
            password,
        });
        
        //user.password = '';    

        return response.json({
            name: user?.name, 
            email: user?.email,
            id: user?.id,
            created_at: user?.created_at,
            updated_at: user?.updated_at,
        });
        
    }
}