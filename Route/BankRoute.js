import express from 'express'
import { AddBankDetails } from '../Controller/BankController.js'



const BankRoute = express.Router()

.post("/bank-details",AddBankDetails)


export default BankRoute