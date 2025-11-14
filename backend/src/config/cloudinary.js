import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// multer configuration to upload to a specific folder in Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tours-app',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

// Create the Multer upload middleware
// 'image' is the field name in form
const upload = multer({ storage: storage });

export default upload;