import { inject, injectable } from 'tsyringe';

import ThrowError from '../../../shared/errors/ThrowError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../../users/infra/typeorm/entities/Users';

interface IRequest {
    user_id: string;
}

@injectable()
class DeleteUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {};

    public async execute({ user_id }: IRequest): Promise<User> {

        const user = await this.usersRepository.findById(user_id);

        if(!user) {
           throw new ThrowError('User not found'); 
        }

        const result = await this.usersRepository.removeUser(user);

        return result;
    };
}

export default DeleteUserService;