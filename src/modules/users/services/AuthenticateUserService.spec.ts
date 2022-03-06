import ThrowError from '../../../shared/errors/ThrowError';
import TestUsersRepository from '@modules/users/repositories/tests/TestUsersRepository';
import TestHashProvider from '../providers/HashProvider/tests/TestHashProvider';
import AuthenticateUserService  from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';


let testUsersRepository: TestUsersRepository;
let testHashProvider: TestHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;


describe('Authenticate User', () => {

    beforeEach(() => {
        testUsersRepository = new TestUsersRepository();
        testHashProvider = new TestHashProvider();

        createUser = new CreateUserService(testUsersRepository, testHashProvider);
        authenticateUser = new AuthenticateUserService(testUsersRepository, testHashProvider);
    });

    it('should be able to authenticate', async () => {

        const user = await createUser.execute({ 
            name: 'me',
            email: 'me@test.com',
            password: '123456'
        });

        const response = await authenticateUser.execute({ email: 'me@test.com', password: '123456'});

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await createUser.execute({ 
            name: 'me',
            email: 'me@test.com',
            password: '123456'
        });

        expect(authenticateUser.execute({ email: 'me@test.com', password: '223456'})).rejects.toBeInstanceOf(ThrowError);
    });

    it('should not be able to authenticate with non existing user', async () => {
    
        expect(authenticateUser.execute({ email: 'me@test.com', password: '123456'})).rejects.toBeInstanceOf(ThrowError);
    });

    

    

    
});

