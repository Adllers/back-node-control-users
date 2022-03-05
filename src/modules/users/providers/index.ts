import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

//ao injetar um HashProvider, vamos instanciar uma BCryptHashProvider para injetar
container.registerSingleton<IHashProvider>(
    'HashProvider',
    BCryptHashProvider
)