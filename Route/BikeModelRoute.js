import express from 'express'


import { ActiveBikeModel, bikeEditGetFunction, bikeModelDeleteFunction, bikeModelFunction, bikeModelGetFunction, bikeModelUpdateFunction } from '../Controller/BikemodelController.js'



const BikemodelRoute = express.Router()

.post("/add-bikemodel",bikeModelFunction)
.get("/get-bikemodel",bikeModelGetFunction)
.put("/update-bikemodel/:id",bikeModelUpdateFunction)
.delete("/delete-bikemodel/:id",bikeModelDeleteFunction)
.get("/get-bikemodel/:id",bikeEditGetFunction)

.put("/active-bikemodel/:id",ActiveBikeModel)

export default BikemodelRoute