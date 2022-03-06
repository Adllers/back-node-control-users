import ThrowError from '../../../shared/errors/ThrowError';

import TestUsersRepository from '@modules/users/repositories/tests/TestUsersRepository';
import TestHashProvider from '@modules/users/providers/HashProvider/tests/TestHashProvider';
import UpdateProfileService from './UpdateProfileService';

let testHashProvider: TestHashProvider;
let testUsersRepository: TestUsersRepository;
let updateProfileService: UpdateProfileService;

describe('Update Profile User', () => {

    beforeEach(() => {
        testUsersRepository = new TestUsersRepository();
        testHashProvider = new TestHashProvider();

        updateProfileService = new UpdateProfileService(testUsersRepository, testHashProvider);
    });

    it('should be able to update profile', async () => {
        
        const user = await testUsersRepository.create({ name: 'Me', email: 'me@test.com', password: '123456'});

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'You',
            email: 'you@test.com'
        });

        expect(updatedUser.name).toBe('You');
    });

    it('should not be able to update your email to an existing email', async () => {
        
        const userOne = await testUsersRepository.create({ name: 'Me', email: 'me@test.com', password: '123456'});
        const userTwo = await testUsersRepository.create({ name: 'You', email: 'you@test.com', password: '123456'});

        await expect(updateProfileService.execute({
            user_id: userOne.id,
            name: 'You',
            email: 'you@test.com'
        })).rejects.toBeInstanceOf(ThrowError);
    });

    it('should be able to update the password', async () => {
        
        const user = await testUsersRepository.create({ name: 'Me', email: 'me@test.com', password: '123456'});

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'You',
            email: 'you@test.com',
            old_password: '123456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password with wrong old password', async () => {
        
        const user = await testUsersRepository.create({ name: 'Me', email: 'me@test.com', password: '123456'});

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'You',
            email: 'you@test.com',
            old_password: 'wrong password',
            password: '123123',
        }),).rejects.toBeInstanceOf(ThrowError);
    });

    it('should not be able to update profile from non-existing user', async () => {
        
        await expect(updateProfileService.execute({
            user_id: 'non-existing-id',
            name: 'Test Name',
            email: 'email@teste.com',
        })).rejects.toBeInstanceOf(ThrowError);
        
    });
 
});