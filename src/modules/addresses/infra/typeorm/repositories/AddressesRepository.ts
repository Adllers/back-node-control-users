import { getRepository, Repository, Raw } from 'typeorm';
import IAddressesRepository from '../../../repositories/IAddressesRepository';
import Address from '../entities/Address';
import ICreateAddressDTO from '../../../dtos/ICreateAddressDTO';
import IFindAddressesDTO from '../../../dtos/IFindAddressesDTO';


class AddressesRepository implements IAddressesRepository {

    private ormRepository:Repository<Address>;

    constructor() {

        this.ormRepository = getRepository(Address);

    }

    public async create({ country, state, city, district, street, address_number, user_id }: ICreateAddressDTO): Promise<Address> {
        
        const address = this.ormRepository.create({ country, state, city, district, street, address_number, user_id });

        await this.ormRepository.save(address);

        return address;
    }

    public async findByCountry({ user_id, country}: IFindAddressesDTO): Promise<Address[]> {

        const addressesQuery = await this.ormRepository
        .createQueryBuilder()
        .where("user_id = :user_id", {user_id})
        .andWhere("country = :country", { country })
        .getMany();
        

        return addressesQuery;
    }
}

export default AddressesRepository;