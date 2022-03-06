import { inject, injectable } from 'tsyringe';

import ThrowError from '../../../shared/errors/ThrowError';

import Address from '../infra/typeorm/entities/Address';
import IAddressesRepository from '../repositories/IAddressesRepository';

interface IRequest {
    user_id: string;
    address_id: string;
    country: string,
    state: string,
    city: string,
    district: string,
    street: string,
    address_number: string,
}

@injectable()
class UpdateAddressService {

    constructor(
        @inject('AddressesRepository')
        private addressesRepository: IAddressesRepository,
    ) {};

    public async execute({ user_id, address_id, country, state, city, district, street, address_number }: IRequest): Promise<Address> {

        const address = await this.addressesRepository.findById(address_id);

        if(!address) {
            throw new ThrowError('Address does not exists!');
        }

        if(address.user_id != user_id) {
           throw new ThrowError('You are not allowed to update this address'); 
        }

        address.country = country;
        address.state = state;
        address.city = city;
        address.district = district;
        address.street = street;
        address.address_number = address_number;

        await this.addressesRepository.save(address);

        return address;
    };
}

export default UpdateAddressService;