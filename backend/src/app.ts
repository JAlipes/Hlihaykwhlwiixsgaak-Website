// Import boilercode
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// Import routes
import AuthRouter from './routes/AuthRoutes';

// Import Utils Functions
import { GetEnvVarOrFail } from './utils/GetEnvVarOrFail';

const app = express();

// Core Middleware
app.use(cors({
    origin: GetEnvVarOrFail('FRONTEND_URL'),
    credentials: true
}));
app.use(express.json()); 
app.use(cookieParser());

// API Routes + Custom Middleware
app.use('/api/auth', AuthRouter);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Application 500 error something broke!');
});

export default app; // Export the configured Express app