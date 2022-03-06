import "reflect-metadata";
import 'dotenv/config';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import router  from './routes/index';
import ThrowError from '../../errors/ThrowError';

import swaggerFile from "../../../swagger.json";

//conexão BD
import "../typeorm";

import "../../container";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

//tratativas de erros
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
   
    // erro em alguma parte conhecida da aplicação
    if (error instanceof ThrowError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    console.error(error);

    // erro em algo desconhecido
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });

});

app.listen(3333, () => {console.log("Server is running!")});