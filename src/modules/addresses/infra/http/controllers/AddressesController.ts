import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAddressService from '../../../services/CreateAddressService';
import AddressesAvailabilitiesService from '../../../services/AddressesAvailabilitiesService';
import UpdateAddressService from '../../../services/UpdateAddressService';
import DeleteAddressService from '../../../services/DeleteAddressService';

//index, show, create, update, delete
export default class AdressesController {


   public async create(request: Request, response: Response): Promise<Response> {

       //Dados do token
       const user_id = request.user.id;

       // Dados do endereço a ser criado
       const { country, state, city, district, street, address_number } = request.body;
    
       const createAddress = container.resolve(CreateAddressService);

       const address = await createAddress.execute({ country, state, city, district, street, address_number, user_id});

       return response.status(201).json(address);
   } 


   public async index(request: Request, response: Response): Promise<Response> {
       
       const { user_id } = request.params;
        
       const { country } = request.query;

       // injetando repositorio
       const addressesAvailabilities = container.resolve(AddressesAvailabilitiesService);

       const addresses = await addressesAvailabilities.execute({ 
           user_id, 
           country: String(country), 
        });

       return response.json(addresses);
   } 

   public async update(request: Request, response: Response): Promise<Response> {

        const user_id = request.user.id;

        const {address_id} = request.params;

        const { country, state, city, district, street, address_number } = request.body;

        const updateAddress = container.resolve(UpdateAddressService);

        const address = await updateAddress.execute({
            user_id, 
            address_id,
            country,
            state,
            city,
            district,
            street,
            address_number,
        });
          
        return response.json(address);

   }
   

   public async delete(request: Request, response: Response): Promise<Response> {

        const user_id = request.user.id

        const {address_id} = request.params;
    
        const addressToRemove = container.resolve(DeleteAddressService);

        const address = await addressToRemove.execute({ user_id, address_id });

        return response.json(address);
   }

};