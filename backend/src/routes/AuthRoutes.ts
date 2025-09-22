import Router from 'express';

// Import Middleware

// Import Controller
import { Login, Logout, verify } from '../controllers/AuthController';
import { Authenticate } from '../middleware/AuthMiddleware';

// Routes
const authRouter = Router();

authRouter.post('/login' , Login);
authRouter.post('/logout', Logout);
authRouter.get('/verify', Authenticate, verify);

export default authRouter;