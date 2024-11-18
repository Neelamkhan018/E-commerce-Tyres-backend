import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import express from 'express'
import cors from 'cors'
import route from './Route/Route.js';
import { fileURLToPath } from 'url'

import path from "node:path"
import { log } from 'console';
import userRoute from './Route/TyreRoute.js';
import multer from 'multer';
import carRoutes from './Route/carRoute.js';
import carModelRoute from './Route/carModelRoute.js';
import BikebrandRoute from './Route/BiikebrandRoute.js';
import BikemodelRoute from './Route/BikeModelRoute.js';
import Dealerpage from './Route/DealerRoute.js';
import Frontlogin from './Route/FrontendLoginRoute.js';
import createdealer from './Route/DealerCreateRoute.js';
import BankRoute from './Route/BankRoute.js';

import BusinessRoutes from './Route/BussinessRoute.js';



mongoose.connect('mongodb://localhost:27017/sanjay')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));


const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(cors())


app.use("/",route)
app.use("/",userRoute)
app.use("/",carRoutes)
app.use("/",carModelRoute)
app.use("/",BikebrandRoute)
app.use("/",BikemodelRoute)
app.use("/",Dealerpage)
app.use("/",Frontlogin)
app.use("/",createdealer)
app.use("/",BankRoute)
app.use("/",BusinessRoutes)

 app.listen(8000, ()=>{
    console.log('Server Is Running');
})