import express from 'express';
import { activeBatteryBrand, batteryAddFunction, batteryBrandGetFunction, batteryDeleteFunction, batteryGetFunction, batteryUpdateFunction, countBatteryFunction, getForBattery } from '../Controller/BatteryBrandcontroller.js';


const BatteryBrandRoute = express.Router()

  .post('/add-Batterybrand', batteryAddFunction)
  .get('/get-Batterybrand', batteryGetFunction)
  .put('/Battery-update/:id', batteryUpdateFunction)
  .delete('/Battery-delete/:id', batteryDeleteFunction)
  .get('/get-Batterybrand/:id', batteryBrandGetFunction)  // Get a specific battery brand
  .get('/get-Batterybrands-with-model-counts', countBatteryFunction)
  .put('/active-Batterybrand/:id', activeBatteryBrand)
  .get('/get-forbattery/:brandId', getForBattery); // Get battery models for a specific brand

export default BatteryBrandRoute;