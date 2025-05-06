import express from 'express';
import { accessoriesBrandAddFunction, accessoriesBrandDeleteFunction, accessoriesBrandGetById, accessoriesBrandGetFunction, accessoriesBrandUpdateFunction, activeAccessoriesBrand, countAccessoriesFunction, getForAccessoriesBrand } from '../Controller/AccessoriesBrandController.js';

const AccessoriesBrandRoute = express.Router()


  .post('/add-accessoriesbrand', accessoriesBrandAddFunction)
  .get('/get-accessoriesbrand', accessoriesBrandGetFunction)
  .put('/update-accessoriesbrand/:id', accessoriesBrandUpdateFunction)
  .delete('/delete-accessoriesbrand/:id', accessoriesBrandDeleteFunction)
  .get('/get-accessoriesbrand/:id', accessoriesBrandGetById) // Get single brand
  .get('/get-accessoriesbrands-with-model-counts', countAccessoriesFunction) // Optional: with model counts
  .put('/active-accessoriesbrand/:id', activeAccessoriesBrand)
  .get('/get-foraccessories/:brandId', getForAccessoriesBrand); // Get accessories models for specific brand

export default AccessoriesBrandRoute;
