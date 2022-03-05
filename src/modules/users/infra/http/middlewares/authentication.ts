import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../../../config/auth';
import ThrowError from '../../../../../shared/errors/ThrowError';


interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function Authentication(
    request: Request, 
    response: Response, 
    next: NextFunction
): void {

    //verificando se há token
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new ThrowError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);
        
        // decoded do tipo TokenPayload 
        const { sub } = decoded as TokenPayload;
        
        // foi criado arquivo express.d.ts para que request da lib do express pudesse ser rescrito
        request.user = { 
            id: sub,
        }
        // então teremos o id do usuário para as demais rotas quando ele estiver autenticado
        
        return next();

    } catch {

        throw new ThrowError('Invalid JWT token', 401);

    }

}