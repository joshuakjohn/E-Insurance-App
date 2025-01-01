import multer, { StorageEngine, FileFilterCallback } from 'multer';
import { Request, Response, NextFunction } from 'express';

const storage: StorageEngine = multer.memoryStorage();

// Define file filter logic to accept certain file types
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Only JPEG, PNG, JPG, and PDF files are allowed!') as any, false); // Reject the file
    }
  },
}).fields([{ name: 'uploadedDocuments', maxCount: 10 }, { name: 'profilePhoto', maxCount: 1 }]); // Field names should be 'uploadedDocuments' and 'profilePhoto'

// Usage in a route handler
const uploadHandler = (req: Request, res: Response, next: NextFunction) => {
  // Check for 'uploadedDocuments' and 'profilePhoto' fields separately
  const uploadedDocuments = req.files['uploadedDocuments'];
  const profilePhoto = req.files['profilePhoto'];

  if (uploadedDocuments && uploadedDocuments.length > 0) {
    next();
  } else if (profilePhoto && profilePhoto.length > 0) {
   next()
  } else {
    res.status(400).json({ message: 'No files uploaded or wrong field name' });
  }
};

// Exporting the upload handler to use in routes
export { upload, uploadHandler };
