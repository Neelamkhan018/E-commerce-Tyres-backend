import express from 'express'
import { FrontendLogin, FrontendRegister, FrontendUpdate, getupdatedetails, loginpage } from '../Controller/FrontendLogincontroller.js'




const Frontlogin = express.Router()

.post('/front-register',FrontendRegister)
.post('/front-login',FrontendLogin)
.post('/loginpage',loginpage)
.put('/update-user', FrontendUpdate)
.get('/get-user' , getupdatedetails)




export default Frontlogin;