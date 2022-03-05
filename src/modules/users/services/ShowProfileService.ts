import { inject, injectable } from 'tsyringe';

import ThrowError from '../../../shared/errors/ThrowError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/Users';

interface IRequest {
    user_id: string;
}

@injectable()
class ShowProfileService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

    ) {};

    public async execute({ user_id}: IRequest): Promise<User> {

        const user = await this.usersRepository.findById(user_id);

        if(!user) {
           throw new ThrowError('User not found'); 
        }

        return user;
    };
}

export default ShowProfileService;