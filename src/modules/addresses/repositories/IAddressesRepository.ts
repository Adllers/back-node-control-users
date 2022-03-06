import Address from '../infra/typeorm/entities/Address';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import IFindAddressesDTO from '../dtos/IFindAddressesDTO';

export default interface IAddressesRepository {
    create( data:ICreateAddressDTO): Promise<Address>;
    findByCountry( data: IFindAddressesDTO): Promise<Address[]>
}