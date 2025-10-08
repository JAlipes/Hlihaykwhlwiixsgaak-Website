import Router from 'express';
import multer from 'multer';

// Import Middleware
import { Authenticate } from '../middleware/AuthMiddleware';

// Import Controller
import { GetData, SaveData, SaveSlides } from '../controllers/SectionController'; 

const upload = multer(); // memory storage (sufficient for forwarding to Cloudinary)
const sectionRouter = Router();

// Save basic section (single image + text)
sectionRouter.post('/save', Authenticate, upload.single('image'), SaveData);
// Save slides (multiple testimonials). slideImages[] aligns with indices of slides needing new images.
sectionRouter.post('/save-slides', Authenticate, upload.array('slideImages'), SaveSlides);
sectionRouter.get('/get', GetData);

export default sectionRouter;