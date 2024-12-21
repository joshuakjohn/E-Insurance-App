import multer, { StorageEngine, FileFilterCallback } from 'multer';
import { Request, Response, NextFunction } from 'express';

const storage: StorageEngine = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // 5 MB limit
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith('')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!') as any, false);  
    }
  },
});

export default upload;
