import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
const app = express();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
    },
});

const upload = multer({ storage });
// Routes for image upload
app.post(
    "/upload",
    upload.single("image"),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const uploadedFile = req.file;

            res.json({
                message: "Image uploaded successfully!",
                timestamp: Date.now(),
                imageId: uploadedFile?.filename,
            });
        } catch (error) {
            // next(error);
            console.log(error);
        }
    }
);

app.get("/uploads/:imageId", (req: Request, res: Response) => {
    const filename = req.params.imageId;
    const filePath = path.join(__dirname, "..", "uploads", filename);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File doesn't exist, so return a 404 Not Found response
            res.status(404).send("File not found.");
            console.log(err);
        } else {
            // File exists, so serve it
            res.setHeader("Content-Type", "video/mp4");
            res.sendFile(filePath);
        }
    });
});
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, this is the root endpoint!");
});
export default app;
