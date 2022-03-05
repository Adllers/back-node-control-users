import "reflect-metadata";
import express from 'express';
import router  from './routes/index';

//conexão BD
import "../typeorm";

import "../../container";


const app = express();

app.use(express.json());
app.use(router);


app.listen(3333, () => {console.log("Server is running!")});