import express from "express"
import { AddAccinfo } from "../Controller/Accinfocontroller.js";



const AccinfoRoute = express.Router()
.post('/Accinfo',AddAccinfo)



export default AccinfoRoute;