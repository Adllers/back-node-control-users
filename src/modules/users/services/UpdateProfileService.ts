import { inject, injectable } from 'tsyringe';

import ThrowError from '../../../shared/errors/ThrowError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../../users/infra/typeorm/entities/Users';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}
@injectable()
class UpdateProfileService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {};

    public async execute({ user_id, name, email, password, old_password}: IRequest): Promise<User> {

        const user = await this.usersRepository.findById(user_id);

        if(!user) {
           throw new ThrowError('User not found'); 
        }

        const userEmailAlreadyExists = await this.usersRepository.findByEmail(email); 
        
        if (userEmailAlreadyExists && userEmailAlreadyExists.id != user_id) {
            throw new ThrowError('Email already exists');
        }

        user.name = name;
        user.email = email;

        if (password && !old_password) {
            throw new ThrowError('Where is the old password?');
        }

        if (password && old_password) {

            const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);

            if (!checkOldPassword) {
                throw new ThrowError('Old password does not match');
            }

            if (checkOldPassword) {
                user.password = await this.hashProvider.generateHash(password);
            }
        }

        await this.usersRepository.save(user);

        return user;
    };
}

export default UpdateProfileService;