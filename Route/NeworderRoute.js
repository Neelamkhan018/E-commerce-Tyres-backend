import express from 'express'
import { CancelOrder, createOrder, getAllOrders, getcancelhistory, getcustomer, getOrderById, rejectorder, status } from '../Controller/Newordercontroller.js'



const NeworderRoute = express.Router()


.post("/create-order", createOrder)
.get("/orders", getAllOrders)
.get("/orders/:id", getOrderById)
.put("/orders/cancel/:id",CancelOrder)
.get("/orders-history",getcancelhistory)
.get('/customer/:id', getcustomer)
.put('/reject/:orderId',rejectorder)
.put("/status/:orderId",status)


export default NeworderRoute;