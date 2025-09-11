// src/server.ts
import app from './app'; // Import the configured Express app
import mongoose from 'mongoose'; // For database connection

// Import utils
import { seedUser } from './utils/SeedUser';

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/my_onepager';

// Database Connection
mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('MongoDB Connected Successfully!');
        
        //seed user
        await seedUser();    

        app.listen(PORT, () => {
            // Seed the user.
            console.log(`Server running on port ${PORT}`);
            console.log(`Access at: http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1); // Exit process if DB connection fails
    });