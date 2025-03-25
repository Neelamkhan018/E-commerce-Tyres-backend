import express from 'express'
import { AddBusinessDetails, getAddress, getStoreName } from '../Controller/BusinessController.js'


const BusinessRoutes = express.Router()
.post("/add-business-details",AddBusinessDetails)
.get("/get-addresses", getAddress)


.get("/get-store/:clientId", getStoreName);


export default BusinessRoutes;