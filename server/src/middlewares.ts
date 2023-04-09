import multer from 'multer';
import path from 'path';





const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'uploaded_images/'),
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + '-' + Date.now() + extension;
    callback(null, filename);
  },
});

const upload = multer({ storage });





export { upload };