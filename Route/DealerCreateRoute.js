import express from 'express'
import {AddCreateDealer, AddcreateOtp, AddDealerLogin, addGstDetails, AddLoginOtp, getAllDealers, GstgenerateOtp, GstVerifyOtp } from '../Controller/DealerCreateController.js'


const createdealer = express.Router()
.post("/dealer-create-acc",AddCreateDealer) //register
.post("/dealer-otp",AddcreateOtp) //otp
.post("/dealer-login",AddDealerLogin) //login
.post("/dealer-login-otp",AddLoginOtp) //otp
.post("/gst-generate-otp",GstgenerateOtp)
.post("/gst-verify-otp",GstVerifyOtp)
.post("/add-gst-details",addGstDetails)


//this route is for dealer list 
.get("/get-dealers",getAllDealers)


export default createdealer