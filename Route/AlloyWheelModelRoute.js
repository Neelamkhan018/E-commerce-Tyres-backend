import express from 'express';
import { activeAlloyModel, alloyEditGetFunction, alloyModelDeleteFunction, alloyModelFunction, alloyModelGetFunction, alloyModelUpdateFunction } from '../Controller/AlloyWheelmodelcontroller.js';


const AlloyWheelModelRoute = express.Router()

  .post("/add-AlloyWheelmodel", alloyModelFunction) // Route to add a new alloy wheel model
  .get("/get-AlloyWheelmodel", alloyModelGetFunction) // Route to get alloy wheel models
  .get("/get-AlloyWheelmodel/:id", alloyEditGetFunction) // Route to get a single alloy wheel model by ID
  .put("/update-AlloyWheelmodel/:id", alloyModelUpdateFunction) // Route to update an alloy wheel model
  .delete("/delete-AlloyWheelmodel/:id", alloyModelDeleteFunction) // Route to delete an alloy wheel model
  .put("/active-AlloyWheelmodel/:id", activeAlloyModel); // Route to update the active status of an alloy wheel model

export default AlloyWheelModelRoute;
