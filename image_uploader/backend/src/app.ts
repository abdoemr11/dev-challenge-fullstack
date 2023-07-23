import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const app = express();
const upload = multer({ dest: 'uploads/' });

// Routes for image upload
app.post('/upload', upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {  
  try {
    res.json({ message: 'Image uploaded successfully!' });
  } catch (error) {
    // next(error);
    console.log(error);
    
  }
});
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is the root endpoint!');
});
export default app;
