

// import { S3Client } from '@aws-sdk/client-s3';
// import multer from 'multer';
// import multerS3 from 'multer-s3';


// const s3Client = new S3Client({
//   endpoint: 'https://blr1.digitaloceanspaces.com', // ✅ MUST be exact
//   region: 'us-east-1',                             // ✅ MUST be this for DO
//   credentials: {
//     accessKeyId: 'DO801RPDF3DJ6MKDG3LY',            // ✅ Hardcoded
//     secretAccessKey: '34+5UChu5w9ecVtxiS6OAaEt9ZnfqBSOyf6oHAeiA9U',
//   },
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3Client,
//     bucket: 'tyres',        // ✅ Hardcoded
//     acl: 'public-read',
//     key: (req, file, cb) => {
//       const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
//       cb(null, filename);
//     },
//   }),
//   limits: { fileSize: 10 * 1024 * 1024 },
// }).fields([
//   { name: 'avatar', maxCount: 1 },
//   { name: 'thumb1', maxCount: 1 },
//   { name: 'thumb2', maxCount: 1 },
//   { name: 'thumb3', maxCount: 1 },
//   { name: 'thumb4', maxCount: 1 },
//   { name: 'thumb5', maxCount: 1 },
//   { name: 'thumb6', maxCount: 1 },
// ]);

// export default upload;





import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';

const s3Client = new S3Client({
  endpoint: 'https://blr1.digitaloceanspaces.com',
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'DO801RPDF3DJ6MKDG3LY',
    secretAccessKey: '34+5UChu5w9ecVtxiS6OAaEt9ZnfqBSOyf6oHAeiA9U',
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: 'tyres',
    acl: 'public-read',
    key: (req, file, cb) => {
      const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
}).fields([
  { name: 'image', maxCount: 10 },  // for multiple tyre images
  { name: 'avatar', maxCount: 1 },
  { name: 'thumb1', maxCount: 1 },
  { name: 'thumb2', maxCount: 1 },
  { name: 'thumb3', maxCount: 1 },
  { name: 'thumb4', maxCount: 1 },
  { name: 'thumb5', maxCount: 1 },
  { name: 'thumb6', maxCount: 1 },
]);

export default upload;
