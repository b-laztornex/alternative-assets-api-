const express = require('express');
const cors = require('cors'); // Import CORS middleware
const connectDB = require('./src/config/db');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json'); // Ensure the path is correct
dotenv.config();

const HOST = process.env.APP_HOST || 'localhost';
const PORT = process.env.APP_PORT || 5001;
const BASE_PATH = process.env.BASE_PATH || '/api';


const app = express();

console.log("Server is initializing...");
connectDB();

app.use(express.json());
app.use(cookieParser());

// Import routes
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/users');

// Enable CORS with credentials support
app.use(
    cors({
      origin: 'http://localhost:5173', // Allow only this origin
      credentials: true, // Allow cookies and authentication headers
    })
  );


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount routes with base path
app.use(`${BASE_PATH}`, authRoutes);
app.use(`${BASE_PATH}/users`, userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
    console.log(`API is available at http://${HOST}:${PORT}${BASE_PATH}`);
    console.log(`Swagger docs available at http://${HOST}:${PORT}/api-docs`);
});
