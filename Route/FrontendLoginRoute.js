import express from 'express'
import { FrontendLogin, FrontendRegister, loginpage } from '../Controller/FrontendLogincontroller.js'




const Frontlogin = express.Router()

.post('/front-register',FrontendRegister)
.post('/front-login',FrontendLogin)
.post('/loginpage',loginpage)




export default Frontlogin;