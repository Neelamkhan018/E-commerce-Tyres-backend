import express from "express"
import { addLoginFunction, addProductFunction, addRegisterFunction, deleteFunction, GetCheckbox, SearchFunction, ShowDetails, showFunction, showProductFunction, TyreActive, updateFunction } from "../Controller/Controller.js"


const route = express.Router()
.post("/register",addRegisterFunction)  
.post("/login",addLoginFunction)
.post("/add-tyre",addProductFunction)
.get("/get-tyres",showProductFunction)
.get("/get-tyre/:id/:tyreType",showFunction)
.put("/update-tyres/:id/:tyreType",updateFunction)
.delete("/api/tyres/:type/:id",deleteFunction)
.get('/search/:type/:width/:height/:customs/:seasons', SearchFunction)       

.get("/get-details/:id/:tyreType",ShowDetails) 

.put("/active-tyre/:id",TyreActive)


.get("/get-checkbox", GetCheckbox)  //dealer api


export default route

