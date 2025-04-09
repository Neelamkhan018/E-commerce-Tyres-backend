import express from 'express'
import { ActiveTruckModel, truckEditGetFunction, truckModelDeleteFunction, truckModelFunction, truckModelGetFunction, truckModelUpdateFunction } from '../Controller/Truckmodelcontroller.js';




const TruckmodelRoute = express.Router()

.post("/add-Truckmodel",truckModelFunction)
.get("/get-Truckmodel",truckModelGetFunction)
.put("/update-Truckmodel/:id",truckModelUpdateFunction)
.delete("/delete-Truckmodel/:id",truckModelDeleteFunction)
.get("/get-Truckmodel/:id",truckEditGetFunction)

.put("/active-Truckmodel/:id",ActiveTruckModel)



export default TruckmodelRoute;


