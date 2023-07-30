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


function simulateLatency(delay: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
const upload = multer({ storage });
async function trackFileUploadProgress(req: Request, res: Response, next: NextFunction) {
  const imageId = ImageStore.appendNewImage();

  res.locals.imageId = imageId
  let uploadedBytes = 0;
  let totalBytes = 0;

  req.on('data', async (chunk) => {
    uploadedBytes += chunk.length;
    if (totalBytes === 0) {
      totalBytes = parseInt(req.headers['content-length'] || '0', 10);
    }

    const progress = (uploadedBytes / totalBytes) * 100;
    console.log(progress, Date.now())

    // Update the progress in the ImageStore
    ImageStore.updateProgress(res.locals.imageId, progress);

  });

  req.on('end', () => {
    // Reset progress when the request is complete
    ImageStore.updateProgress(res.locals.imageId, 100);
    console.log("this ended sucesffuly");
    
  });

  next();
}
// Routes for image upload
app.post('/upload', trackFileUploadProgress,upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {  
  try {

    res.json({ message: 'Image uploaded successfully!' , imageId: res.locals.imageId});
  } catch (error) {
    // next(error);
    console.log(error);
    
  }
});
app.get('/upload/:socketId',(req: Request, res: Response) => {
  const id = req.params.socketId

  res.json({progress: ImageStore.getProgress(id)})
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is the root endpoint!');
});
export default app;

