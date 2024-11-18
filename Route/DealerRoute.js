import express from 'express'
import { ActiveDealer, addDealaer,  addDealerLogin,  deleteDealer, EditDealer,  GetDealer, UpdateDealer } from '../Controller/DealerContoller.js'


const Dealerpage = express.Router()
.post("/add-dealer",addDealaer)
.get("/get-dealer",GetDealer)   
.put("/update-dealer/:id",UpdateDealer)
.delete("/delete-dealer/:id",deleteDealer)
.get("/edit-dealer/:id",EditDealer)
.put("/active-dealer/:id",ActiveDealer)

.post("/login-dealer",addDealerLogin)  //fix login  

.post("/dealerfront-login")


export default Dealerpage