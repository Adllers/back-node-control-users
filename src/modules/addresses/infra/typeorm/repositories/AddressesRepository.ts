import { getRepository, Repository, Raw } from 'typeorm';
import IAddressesRepository from '../../../repositories/IAddressesRepository';
import Address from '../entities/Address';
import ICreateAddressDTO from '../../../dtos/ICreateAddressDTO';


class AppointmentsRepository implements IAddressesRepository {

    private ormRepository:Repository<Address>;

    constructor() {

        this.ormRepository = getRepository(Address);

    }

    public async create({ country, state, city, district, street, address_number, user_id }: ICreateAddressDTO): Promise<Address> {
        
        const address = this.ormRepository.create({ country, state, city, district, street, address_number, user_id });

        await this.ormRepository.save(address);

        return address;
    }
}

export default AppointmentsRepository;