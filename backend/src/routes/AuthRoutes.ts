import Router from 'express';

// Import Middleware

// Import Controller
import {Login} from '../controllers/AuthController';


// Routes
const authRouter = Router();

authRouter.post('/login' ,Login);

export default authRouter;