// Import boilercode
import express from 'express';
import cors from 'cors';

// Import routes
import authRoutes from './routes/authRoutes';

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors());

// API Routes
app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Application 500 error something broke!');
});

export default app; // Export the configured Express app