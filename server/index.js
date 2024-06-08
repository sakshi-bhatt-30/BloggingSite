import Connection from './database/db.js';
import dotenv from "dotenv";
import Router from './routes/routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';

import express from 'express';
import user from './model/user.js';

dotenv.config();

const app=express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

const PORT=8000;
const username= process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;

Connection(username,password);

app.listen(PORT, ()=>console.log(`server is running at ${PORT}`));
