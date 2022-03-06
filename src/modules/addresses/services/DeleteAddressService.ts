import { inject, injectable } from 'tsyringe';

import ThrowError from '../../../shared/errors/ThrowError';
import Address from '../infra/typeorm/entities/Address';
import IAddressesRepository from '../repositories/IAddressesRepository';

interface IRequest {
    user_id: string;
    address_id: string;
}

@injectable()
class DeleteUserService {

    constructor(

        @inject('AddressesRepository')
        private addressesRepository: IAddressesRepository,

    ) {};

    public async execute({ user_id, address_id }: IRequest): Promise<Address> {

        const address = await this.addressesRepository.findById(address_id);

        if(!address) {
           throw new ThrowError('Address not found'); 
        }

        if(address.user_id != user_id) {
           throw new ThrowError('You are not allowed to delete this address');
        }

        const removedAddress = await this.addressesRepository.removeAddress(address);

        return removedAddress;
    };
}

export default DeleteUserService;