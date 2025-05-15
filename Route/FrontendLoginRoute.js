import express from 'express'
import { FrontendLogin, FrontendRegister, FrontendUpdate, getdetailsbyId, loginpage, sendOtpToEmail, VerifyFrontendOtp, verifyOtp, verifyOtpFromEmail } from '../Controller/FrontendLogincontroller.js'




const Frontlogin = express.Router()

.post('/front-register',FrontendRegister)
.post('/front-login',FrontendLogin)
.post('/loginpage',loginpage)
.put('/update-user', FrontendUpdate) // acc-details api update
.get('/user-details/:id' , getdetailsbyId) //profile acc-details api 

.post('/verify-otp', VerifyFrontendOtp)
.post('/verify-otp-login',verifyOtp)
.post('/send-otp-register',sendOtpToEmail)
.post('/verify-otp-register',verifyOtpFromEmail)



export default Frontlogin;