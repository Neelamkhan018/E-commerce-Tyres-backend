import express from 'express'
import { AddBusinessDetails } from '../Controller/BusinessController.js'


const BusinessRoutes = express.Router()
.post("/add-business-details",AddBusinessDetails)


export default BusinessRoutes