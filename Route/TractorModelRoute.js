import express from 'express'
import { ActiveTractorModel, tractorEditGetFunction, tractorModelDeleteFunction, tractorModelFunction, tractorModelGetFunction, tractorModelUpdateFunction } from '../Controller/Tractormodelcontroller.js';




const TractormodelRoute = express.Router()

.post("/add-Tractormodel",tractorModelFunction)
.get("/get-Tractormodel",tractorModelGetFunction)
.put("/update-Tractormodel/:id",tractorModelUpdateFunction)
.delete("/delete-Tractormodel/:id",tractorModelDeleteFunction)
.get("/get-Tractormodel/:id",tractorEditGetFunction)

.put("/active-Tractormodel/:id",ActiveTractorModel)



export default TractormodelRoute;


