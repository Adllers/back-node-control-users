import Address from '../infra/typeorm/entities/Address';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import IFindAddressesDTO from '../dtos/IFindAddressesDTO';

export default interface IAddressesRepository {
    findById(id: string): Promise<Address | undefined>;
    create( data:ICreateAddressDTO): Promise<Address>;
    findByCountry( data: IFindAddressesDTO): Promise<Address[]>
    save(address: Address): Promise<Address>;
    removeAddress(address: Address): Promise<Address>;
}