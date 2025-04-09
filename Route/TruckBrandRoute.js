import express from 'express'
import { activeTruckBrand, countTruckFunction, getForTruck, truckAddFunction, truckbrandGetFunction, truckDeleteFunction, truckGetFunction, truckUpdateFunction } from '../Controller/TruckBrandcontroller.js'




const TruckBrandRoute = express.Router()
.post('/add-Truckbrand',truckAddFunction)
.get("/get-Truckbrand",truckGetFunction)
.put("/Truck-update/:id",truckUpdateFunction)
.delete("/Truck-delete/:id",truckDeleteFunction)
.get("/get-Truckbrand/:id",truckbrandGetFunction)  //edit api
.get("/get-Truckbrands-with-model-counts",countTruckFunction)
.put("/active-Truckbrand/:id",activeTruckBrand)

.get("/get-forTruck/:brandId",getForTruck) //forTruck

export default TruckBrandRoute