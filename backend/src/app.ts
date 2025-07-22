// src/app.ts
import express from 'express';
import cors from 'cors';
import contentRoutes from './routes/contentRoutes'; // Your API routes

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Enable CORS

// API Routes
app.use('/api', contentRoutes);

// Global Error Handler (optional, but good practice)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app; // Export the configured Express app