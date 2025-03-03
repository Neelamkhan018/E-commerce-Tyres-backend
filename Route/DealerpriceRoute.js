import express from 'express'
import { addDealerPrice  } from '../Controller/Dealerpricecontroller.js';


const Dealerprice = express.Router()

.post("/add-dealer-price", addDealerPrice)
// .get("/get-dealer-prices/:clientId", getDealerPrices)





export default Dealerprice;