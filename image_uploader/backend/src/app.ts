import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import ImageStore from './ImageStore';

const app = express();
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

// Routes for image upload
app.post('/upload', upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {  
  try {
    res.json({ message: 'Image uploaded successfully!' , imageId: ImageStore.appendNewImage()});
  } catch (error) {
    // next(error);
    console.log(error);
    
  }
});
app.get('/upload/:socketId', (req: Request, res: Response) => {
  let id = req.params.socketId
  console.log(id)
  res.json({progress: ImageStore.getProgress(id)})
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is the root endpoint!');
});
export default app;
