import ThrowError from '../../../shared/errors/ThrowError';
import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/Users';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository, 

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {};

    public async execute({ name, email, password }: IRequest): Promise<User | undefined> {
        
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new ThrowError('Email address already used.', 400);
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

    
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        })

        return user;
    }
}

export default CreateUserService;