import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAddressService from '../../../services/CreateAddressService';

//index, show, create, update, delete
export default class AdressesController {

   public async create(request: Request, response: Response): Promise<Response> {

       //Dados do token
       const user_id = request.user.id;

       // Dados do endereço a ser criado
       const { country, state, city, district, street, address_number } = request.body;
    
       const createAddress = container.resolve(CreateAddressService);

       const address = await createAddress.execute({ country, state, city, district, street, address_number, user_id});

       return response.json(address);
   } 

};