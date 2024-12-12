import express from "express"
import { AddressBook, getAddressBook } from "../Controller/Customercontroller.js";



const customerRoute = express.Router()
.post('/Addressbook',AddressBook)
.get('/get-address',getAddressBook)

export default customerRoute;