import Router from 'express';

// Import Middleware

// Import Controller
import {Login, Logout} from '../controllers/AuthController';


// Routes
const authRouter = Router();

authRouter.post('/login' , Login);
authRouter.get('/logout', Logout);

export default authRouter;