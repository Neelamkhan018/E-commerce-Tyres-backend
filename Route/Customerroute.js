import express from "express"
import { AddressBook, getAddressBook, shipping } from "../Controller/Customercontroller.js";



const customerRoute = express.Router()
.post('/shipping',shipping) // shipping address code in customer dashboard
.post('/Addressbook',AddressBook) //billing address code in customer dashboard
.get('/get-address',getAddressBook)


export default customerRoute;