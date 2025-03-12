import express from 'express'
import { CancelOrder, createOrder, getAllOrders, getcancelhistory, getcustomer, getOrderById } from '../Controller/Newordercontroller.js'



const NeworderRoute = express.Router()


.post("/create-order", createOrder)
.get("/orders", getAllOrders)
.get("/orders/:id", getOrderById)
.put("/orders/cancel/:id",CancelOrder)
.get("/orders-history",getcancelhistory)
.get('/customer/:id', getcustomer)

export default NeworderRoute;