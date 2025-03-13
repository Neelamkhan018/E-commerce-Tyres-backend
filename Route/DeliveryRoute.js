import express from 'express'
import {  selectDeliveryOption } from '../Controller/Deliverycontroller.js';


const DeliveryRoute = express.Router()


.post("/select-delivery-option", selectDeliveryOption)
// .get("/get-delivery-option/:tyreId",getdelivery)

export default DeliveryRoute;
