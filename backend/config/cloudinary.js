import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';
dotenv.config();
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",
        // format: async (req, file) => "png",
        public_id: (req, file) => file.originalname ? file.originalname.split(".")[0] : Date.now().toString(), // Fallback for missing filename
    }
});

const upload = multer({ storage });
cloudinary.api.resource("uploads/476834040_552020137887398_6386595636279726849_n",);


export {cloudinary, upload}