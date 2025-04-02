import express from 'express'
import { CancelOrder, createOrder, getAllOrders, getcancelhistory, getcustomer, getHomeDeliveryOrders, getOrderById, getTotalAmountByClientId, getTotalAmountPerDealer, rejectorder, status } from '../Controller/Newordercontroller.js'



const NeworderRoute = express.Router()


.post("/create-order", createOrder)
.get("/orders", getAllOrders)
.get("/orders/:id", getOrderById)
.put("/orders/cancel/:id",CancelOrder)
.get("/orders-history",getcancelhistory)
.get('/customer/:id', getcustomer)
.put('/reject/:orderId',rejectorder)
.put("/status/:orderId",status)
.get("/home-delivery", getHomeDeliveryOrders)
.get('/total-amount-per-dealer', getTotalAmountPerDealer)

.get("/get-total-amount-by-client/:clientId", getTotalAmountByClientId);




export default NeworderRoute;