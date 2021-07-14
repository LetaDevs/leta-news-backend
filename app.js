import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';
import router from './routes/router.js';

// modelos
import Noticias from './models/Noticias.js';
import Usuarios from './models/Usuarios.js';
import LeerMasTarde from './models/LeerMasTarde.js';

dotenv.config({path: '.env'});

db.sync({alter: true})
	.then(() => console.log('base de datos conectada'))
	.catch((error) => console.log(error));

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));

app.use('/', router);

const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';
app.listen(port, host, () => console.log('servidor funcionando correctamente'));
