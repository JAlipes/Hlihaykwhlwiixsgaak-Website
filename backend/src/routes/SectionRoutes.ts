import Router from 'express';

// Import Middleware
import { Authenticate } from '../middleware/AuthMiddleware';

// Import Controller
import { GetData, SaveData } from '../controllers/SectionController'; 

const sectionRouter = Router();

sectionRouter.post('/save', Authenticate, SaveData);
sectionRouter.get('/get', GetData);

export default sectionRouter;