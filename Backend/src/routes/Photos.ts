import { Router, Request, Response } from "express";
import { uploadProfilePicture } from "../config/multer-config";
import Photo from '../models/PhotoSchema';
import { S3 } from "aws-sdk";

const photosRouter = Router();

// Define the createPhotoDocument function
const createPhotoDocument = async (file: MulterFile) => {
  const photo = new Photo({
    filename: file.originalname,
    path: file.path,
    // Add other fields as needed
  });
  await photo.save();
  return photo._id; // Return the ObjectId
};

// Add proper typing for the file from multer
interface MulterFile extends Express.Multer.File {
  bucket: string;
  key: string;
  location: string;
}

photosRouter.post('/upload/photos', uploadProfilePicture, async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      res.status(400).json({ error: 'No files uploaded' });
      return;
    }

    const files = req.files as MulterFile[];
    const photos = files.map(file => file.location);
    console.log('Photo URLs:', photos);

    res.json({ photos });
  } catch (error: unknown) {
    console.error('Upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});



export default photosRouter;
