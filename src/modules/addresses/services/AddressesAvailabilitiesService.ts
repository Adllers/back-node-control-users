import { inject, injectable } from 'tsyringe';

import IAddressesRepository from '../../addresses/repositories/IAddressesRepository';
import Address from '../infra/typeorm/entities/Address';

interface IRequest {
    user_id: string; 
    country: string;
}

@injectable()
class AddressesAvailabilitiesService {

    constructor(
        @inject('AddressesRepository')
        private addressesRepository: IAddressesRepository,
    ) {};

    public async execute({ user_id, country}: IRequest): Promise<Address[]> {
        
        const addresses = await this.addressesRepository.findByCountry({
            user_id,
            country 
        });

        return addresses;
    };

}

export default AddressesAvailabilitiesService;