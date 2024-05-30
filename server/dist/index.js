"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import required modules
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Create an instance of the express application
const app = (0, express_1.default)();
// Define the port number
const PORT = 5000;
// Middleware to parse JSON requests
app.use(express_1.default.json());
// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use((0, cors_1.default)());
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
