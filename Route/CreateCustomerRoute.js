import express from 'express';
import { AddCreatecustomer } from '../Controller/CreateCustomerController.js';




const CreateRoute = express.Router()

// Define the POST route for creating a customer account
.post('/create-customer-acc', AddCreatecustomer)



export default CreateRoute;