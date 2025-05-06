import express from 'express';
import { activeAlloyWheelBrand, alloyWheelAddFunction, alloyWheelBrandGetFunction, alloyWheelDeleteFunction, alloyWheelGetFunction, alloyWheelUpdateFunction, countAlloyWheelFunction, getForAlloyWheel } from '../Controller/AlloyWheelbrandcontroller.js';


const AlloyWheelBrandRoute = express.Router()

  .post('/add-alloybrand', alloyWheelAddFunction)
  .get('/get-alloybrand', alloyWheelGetFunction)
  .put('/alloy-update/:id', alloyWheelUpdateFunction)
  .delete('/alloy-delete/:id', alloyWheelDeleteFunction)
  .get('/get-alloybrand/:id', alloyWheelBrandGetFunction) // Get a specific alloy brand
  .get('/get-alloybrands-with-model-counts', countAlloyWheelFunction)
  .put('/active-alloybrand/:id', activeAlloyWheelBrand)
  .get('/get-foralloywheel/:brandId', getForAlloyWheel); // Get alloy models for a specific brand

export default AlloyWheelBrandRoute;
