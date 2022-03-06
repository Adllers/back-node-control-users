import ThrowError from '../../../shared/errors/ThrowError';

import TestUsersRepository from '@modules/users/repositories/tests/TestUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import User from '../infra/typeorm/entities/Users';

let testUsersRepository: TestUsersRepository;
let showProfileService: ShowProfileService;

describe('Show Profile User', () => {

    beforeEach(() => {
        testUsersRepository = new TestUsersRepository();

        showProfileService = new ShowProfileService(testUsersRepository);
    });

    it('should be able to show profile', async () => {
        
        const user = await testUsersRepository.create({ name: 'Me', email: 'me@test.com', password: '123456'});

        const profileUser = await showProfileService.execute({
            user_id: user.id,
        });

        await expect(profileUser.name).toBe('Me');
        await expect(profileUser.email).toBe('me@test.com');
    });

    it('should not be able to show profile from non-existing user', async () => {
        
        await expect(showProfileService.execute({
            user_id: 'non-existing-id',
        })).rejects.toBeInstanceOf(ThrowError);
        
    });
    

   
 
});