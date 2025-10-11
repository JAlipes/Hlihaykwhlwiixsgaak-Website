import Router from 'express';
import multer from 'multer';

// Import Middleware
import { Authenticate } from '../middleware/AuthMiddleware';

// Import Controller
import { GetData, SaveData } from '../controllers/SectionController'; 

const upload = multer();
const sectionRouter = Router();

sectionRouter.post('/save', Authenticate, upload.single('image'), SaveData);
sectionRouter.get('/get', GetData);

export default sectionRouter;