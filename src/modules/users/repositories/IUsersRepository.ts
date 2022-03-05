import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/Users';



export default interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User | undefined>;
    save(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    removeUser(user: User): Promise<User>
}