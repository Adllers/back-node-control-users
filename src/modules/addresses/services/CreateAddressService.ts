import { inject, injectable } from 'tsyringe';

import Address from "../infra/typeorm/entities/Address";

import IAddressesRepository from '../repositories/IAddressesRepository';

import Throw from '../../../shared/errors/ThrowError';

interface IRequest {
    country: string;
    state: string;
    city: string;
    district: string;
    street: string;
    address_number: string;
    user_id: string;
}


@injectable()
class CreateAddressService {
    
    constructor(

        @inject('AddressesRepository')
        private addressesRepository: IAddressesRepository,

    ){}

    public async execute({ country, state, city, district, street, address_number, user_id }: IRequest): Promise<Address> {

        const address = await this.addressesRepository.create({ country, state, city, district, street, address_number, user_id });
  
        return address;
    }
}

export default CreateAddressService;