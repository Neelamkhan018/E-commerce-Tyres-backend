// routes/uploadRoute.js
import express from 'express';
import upload from '../utils/upload.js';
import { uploadFiles } from '../Controller/UploadController.js';


const router = express.Router()

.post('/upload', upload, uploadFiles );

export default router;
