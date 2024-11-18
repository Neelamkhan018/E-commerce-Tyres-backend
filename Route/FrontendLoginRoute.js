import express from 'express'
import { FrontendLogin, FrontendRegister } from '../Controller/FrontendLogincontroller.js'




const Frontlogin = express.Router()

.post('/front-register',FrontendRegister)
.post('/front-login',FrontendLogin)


export default Frontlogin