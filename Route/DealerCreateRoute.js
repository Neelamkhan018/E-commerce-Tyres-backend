import express from 'express'
import {AddCreateDealer, AddcreateOtp, AddDealerLogin, addGstDetails, AddLoginOtp, getAllDealers, getDealerById, getGstDetails, GstgenerateOtp, GstVerifyOtp } from '../Controller/DealerCreateController.js'


const createdealer = express.Router()
.post("/dealer-create-acc",AddCreateDealer) //register
.post("/dealer-otp",AddcreateOtp) //otp
.post("/dealer-login",AddDealerLogin) //login
.post("/dealer-login-otp",AddLoginOtp) //otp
.post("/gst-generate-otp",GstgenerateOtp)
.post("/gst-verify-otp",GstVerifyOtp)

//gst details
.post("/add-gst-details",addGstDetails)
.get("/get-gst-details/:clientId", getGstDetails)

//this route is for dealer list view
.get("/get-dealers",getAllDealers)
.get("/dealer/:id", getDealerById)

export default createdealer