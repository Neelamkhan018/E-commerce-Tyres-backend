import express from 'express'
import { AddBusinessDetails, getAddress } from '../Controller/BusinessController.js'


const BusinessRoutes = express.Router()
.post("/add-business-details",AddBusinessDetails)
.get("/get-addresses", getAddress)

export default BusinessRoutes;