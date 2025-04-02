import express from 'express'
import { adddealerlist, getDealerList } from '../Controller/Dealerstorecontroller.js';


const DealerStore = express.Router()


.post("/update-dealer-list", adddealerlist)
.get("/get-dealer-lists", getDealerList)


export default DealerStore;