import ThrowError from '../../../shared/errors/ThrowError';
import TestUsersRepository from '../../users/repositories/tests/TestUsersRepository';
import CreateUserService  from '../../users/services/CreateUserService';
import TestHashProvider from '../providers/HashProvider/tests/TestHashProvider';


let testUsersRepository: TestUsersRepository;
let testHashProvider: TestHashProvider;
let createUser: CreateUserService;

describe('Create User', () => {

    beforeEach(() => {

        testUsersRepository = new TestUsersRepository();
        testHashProvider = new TestHashProvider();
        createUser = new CreateUserService(testUsersRepository, testHashProvider);
    });

    it('should be able to create a new user', async () => {
        const testUsersRepository = new TestUsersRepository();
        const testHashProvider = new TestHashProvider();
        createUser = new CreateUserService(testUsersRepository, testHashProvider);

        const user = await createUser.execute({ name: 'Me', email: 'me@test.com', password: '123456'});

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with the same email', async () => {
        const testUsersRepository = new TestUsersRepository();
        const testHashProvider = new TestHashProvider();
        createUser = new CreateUserService(testUsersRepository, testHashProvider);

        await createUser.execute({ name: 'Me', email: 'me@test.com', password: '123456'});

        expect(
            createUser.execute({ 
                name: 'Me', 
                email: 'me@test.com', 
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(ThrowError);
    });

    

    
});