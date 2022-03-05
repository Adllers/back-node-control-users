import IUsersRepository from '../../../repositories/IUsersRepository';
import User from '../entities/Users';
import { getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {

    private ormRepository:Repository<User>;

    constructor() {
        //Buscando o repo de user
        this.ormRepository = getRepository(User);
    }

    public async findByEmail(email: string): Promise<User | undefined> {

        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;

    }

    public async findById(id: string): Promise<User | undefined> {

        const user = await this.ormRepository.findOne(id);

        return user;

    }

    public async create(userData: ICreateUserDTO): Promise<User> {

        const user = this.ormRepository.create(userData);

        await this.ormRepository.save(user);

        return user;

    }

    public async save(user: User): Promise<User> {

        return this.ormRepository.save(user);
        
    }
}

export default UsersRepository;