import express from 'express'
import { AddBankDetails, GetBankDetails } from '../Controller/BankController.js'



const BankRoute = express.Router()

.post("/bank-details",AddBankDetails)

.get("/get-bank-details/:clientId", GetBankDetails);


export default BankRoute;
