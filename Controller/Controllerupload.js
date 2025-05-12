// controllers/uploadController.js
export const uploadFiles = async (req, res) => {
    if (!req.files) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
  
    const fileUrls = {};
    for (const field in req.files) {
      fileUrls[field] = req.files[field][0].location;
    }
  
    return res.status(200).json({ message: 'Files uploaded', files: fileUrls });
  };
  