import express from 'express'
import { adddealerlist, getDealerList } from '../Controller/DealerListcontroller.js';



const DealerListRoute = express.Router()


.post("/update-dealer-list", adddealerlist)
.get("/get-dealer-lists", getDealerList)


export default DealerListRoute;