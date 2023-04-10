import { Express } from 'express';
import multer from 'multer';
import path from 'path';
import { Request, Response } from 'express';


export class ImageUploader {
  private storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, 'uploaded_images/'),
    filename: (req, file, callback) => {
      const extension = path.extname(file.originalname);
      const filename = file.fieldname + '-' + Date.now() + extension;
      callback(null, filename);
    },
  });

  private upload = multer({ storage: this.storage });

  constructor(private app: Express) {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.app.post('/upload-image', this.upload.single('image'), (req: Request, res: Response) => {
      res.send({ success: true });
    });
  }
}