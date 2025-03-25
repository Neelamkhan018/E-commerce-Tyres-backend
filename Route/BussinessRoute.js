import express from 'express'
import { AddBusinessDetails, getAddress, getBusinessDetailsByClientId, getStoreName } from '../Controller/BusinessController.js'


const BusinessRoutes = express.Router()
.post("/add-business-details",AddBusinessDetails)
.get("/get-addresses", getAddress)


.get("/get-store/:clientId", getStoreName)

.get('/business/:clientId', getBusinessDetailsByClientId);

export default BusinessRoutes;