import express from 'express'
import { ActiveBikeBrand, bikebrandAddFunction, bikebrandDeleteFunction, bikebrandGetFunction, bikebrandUpdateFunction, bikeCount, bikeeditGetFunction,  getForBike } from '../Controller/Bikebrandcontroller.js'


const BikebrandRoute = express.Router()

.post("/add-bikebrand",bikebrandAddFunction)
.get("/get-bikebrand",bikebrandGetFunction)
.put("/update-bikebrand/:id",bikebrandUpdateFunction)
.delete("/delete-bikebrand/:id",bikebrandDeleteFunction)
.get("/get-bikebrand/:id",bikeeditGetFunction)
.get("/get-bikebrands-with-model-counts",bikeCount)
.put("/active-bikebrand/:id", ActiveBikeBrand)

.get("/get-forbike/:brandId",getForBike) //forbike 



export  default BikebrandRoute;
