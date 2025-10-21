import Router from 'express';
import multer from 'multer';

// Import Middleware
import { Authenticate } from '../middleware/AuthMiddleware';

// Import Controller
import { GetData, SaveData } from '../controllers/SectionController'; 

const upload = multer(); // memory storage (sufficient for forwarding to Cloudinary)
const sectionRouter = Router();

// Save basic section (single image + text)
sectionRouter.post('/save', Authenticate, upload.single('image'), SaveData);
sectionRouter.get('/get', GetData);

export default sectionRouter;