import express from 'express'


 import {  activeCarModel, carmodelDeleteFunction, carModelEditFunction, carModelFunction, carModelGetFunction, CarModelGetIDFunction, carModelupdateFunction, modelGet } from '../Controller/CarModelcontrollers.js'


const carModelRoute = express.Router()
.post('/add-carmodel',carModelFunction)
.get("/get-carmodel",carModelGetFunction)
.put("/update-carmodel/:id",carModelupdateFunction)
.delete("/delete-carmodel/:id",carmodelDeleteFunction)
.get ("/get-carmodel/:id",carModelEditFunction)

.put("/active-carmodel/:id",activeCarModel)


.get("/update-carmodeledit/:id",CarModelGetIDFunction)

.get("/get-model/:id",modelGet)


export default carModelRoute