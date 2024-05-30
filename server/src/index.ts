// Import required modules
import express, { Application } from 'express';
import cors from 'cors';

import jwtAuthRouter from './routes/jwtAuth';

// Create an instance of the express application
const app: Application = express();

// Define the port number
const PORT: number = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Register and login routes

app.use('/auth', jwtAuthRouter);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
