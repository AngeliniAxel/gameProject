// Import required modules
import express, { Application } from 'express';
import cors from 'cors';

import jwtAuthRouter from './routes/jwtAuth';
import dashboardRouter from './routes/dashboard';

const CLIENT_API_ROUTE: string = 'http://localhost:3000';

// Create an instance of the express application
const app: Application = express();

// Define the port number
const PORT: number = 5000;

const corsOptions = {
  origin: CLIENT_API_ROUTE,
  credentials: true, // Allow credentials
};

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors(corsOptions));

// Register and login routes
app.use('/auth', jwtAuthRouter);

// Dashboard route
app.use('/dashboard', dashboardRouter);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
