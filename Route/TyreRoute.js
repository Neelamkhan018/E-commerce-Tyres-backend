import express from 'express'
import  {  GettyreFunction, tyreactive, tyreDeleteFunction, tyreeditGetFunction, tyreFunction, tyreGetFunction, tyreUpdateFunction } from '../Controller/TyreController.js'


const userRoute = express.Router()
.post('/add-tyre-brand' ,tyreFunction)
.get('/get-tyre-brands',tyreGetFunction)
.delete('/delete-tyre-brand/:id',tyreDeleteFunction)
.put('/update-tyre-brand/:id',tyreUpdateFunction)
.get("/get-tyre-brand/:id",tyreeditGetFunction)   //edit api

.put("/active-tyres/:id",tyreactive)

.get("/get-tyre/:id",GettyreFunction)  //image get api


export default userRoute