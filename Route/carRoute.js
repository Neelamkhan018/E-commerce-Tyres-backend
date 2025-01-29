import express from 'express'
import {  activeCarBrand, carAddFunction,  carbrandGetFunction,  carDeleteFunction, carGetFunction, carUpdateFunction, countFunction,  getForcar } from '../Controller/carControllers.js';



const carRoutes = express.Router()
.post('/add-carbrand',carAddFunction)
.get("/get-carbrand",carGetFunction)
.put("/car-update/:id",carUpdateFunction)
.delete("/car-delete/:id",carDeleteFunction)
.get("/get-carbrand/:id",carbrandGetFunction)  //edit api
.get("/get-carbrands-with-model-counts",countFunction)
.put("/active-carbrand/:id",activeCarBrand)

.get("/get-forcar/:brandId",getForcar) //forcar 







export default carRoutes;