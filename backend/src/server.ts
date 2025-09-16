import app from './app'; // Import the configured Express app
import mongoose from 'mongoose'; // For database connection

// Import utils & shared-functions
import { SeedUser } from './utils/SeedUser';
import { GetEnvVarOrFail } from './utils/GetEnvVarOrFail';


const PORT = Number(GetEnvVarOrFail('BACKEND_PORT'));
const MONGODB_URI = GetEnvVarOrFail('MONGODB_URI');

// Database Connection
mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('MongoDB Connected Successfully!');
        
        //seed user
        await SeedUser();    

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Access at: http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1); // Exit process if DB connection fails
    });