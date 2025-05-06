import express from 'express';
import { activeBatteryModel, batteryEditGetFunction, batteryModelDeleteFunction, batteryModelFunction, batteryModelGetFunction, batteryModelUpdateFunction } from '../Controller/Batterymodelcontroller.js';

const BatteryModelRoute = express.Router()


  .post("/add-Batterymodel", batteryModelFunction) // Route to add a new battery model
  .get("/get-Batterymodel", batteryModelGetFunction) // Route to get battery models
  .get("/get-Batterymodel/:id", batteryEditGetFunction) // Route to get a single battery model by ID
  .put("/update-Batterymodel/:id", batteryModelUpdateFunction) // Route to update a battery model
  .delete("/delete-Batterymodel/:id", batteryModelDeleteFunction) // Route to delete a battery model
  .put("/active-Batterymodel/:id", activeBatteryModel); // Route to update the active status of a battery model

export default BatteryModelRoute;