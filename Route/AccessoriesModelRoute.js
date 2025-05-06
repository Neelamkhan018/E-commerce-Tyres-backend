import express from 'express';
import { accessoriesAddFunction, accessoriesDeleteFunction, accessoriesEditGetFunction, accessoriesGetFunction, accessoriesUpdateFunction, activeAccessoriesFunction } from '../Controller/AccessoriesModelController.js';

const AccessoriesModelRoute = express.Router()


  .post("/add-accessoriesmodel", accessoriesAddFunction) // Add new accessories model
  .get("/get-accessoriesmodel", accessoriesGetFunction) // Get accessories models (optionally by brand)
  .get("/get-accessoriesmodel/:id", accessoriesEditGetFunction) // Get single accessories model by ID
  .put("/update-accessoriesmodel/:id", accessoriesUpdateFunction) // Update accessories model
  .delete("/delete-accessoriesmodel/:id", accessoriesDeleteFunction) // Delete accessories model
  .put("/active-accessoriesmodel/:id", activeAccessoriesFunction); // Toggle active status

export default AccessoriesModelRoute;
