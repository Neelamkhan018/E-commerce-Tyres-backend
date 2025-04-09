import express from 'express'
import { activeTractorBrand, countTractorFunction, getForTractor, tractorAddFunction, tractorbrandGetFunction, tractorDeleteFunction, tractorGetFunction, tractorUpdateFunction } from '../Controller/TractorBrandcontroller.js'




const TractorBrandRoute = express.Router()


.post('/add-Tractorbrand',tractorAddFunction)
.get("/get-Tractorbrand",tractorGetFunction)
.put("/Tractor-update/:id",tractorUpdateFunction)
.delete("/Tractor-delete/:id",tractorDeleteFunction)
.get("/get-Tractorbrand/:id",tractorbrandGetFunction)  //edit api
.get("/get-Tractorbrands-with-model-counts",countTractorFunction)
.put("/active-Tractorbrand/:id",activeTractorBrand)
.get("/get-fortractor/:brandId",getForTractor) //forTruck

export default TractorBrandRoute