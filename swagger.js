const swaggerAutogen = require('swagger-autogen')();

require('dotenv').config(); // Load environment variables

const HOST = process.env.APP_HOST || 'localhost';
const PORT = process.env.APP_PORT || '3000';
const BASE_PATH = process.env.BASE_PATH || '/api';
const BASE_URL = process.env.APP_URL || `http://${HOST}:${PORT}${BASE_PATH}`;
const NODE_ENV = process.env.NODE_ENV || 'development';


const doc = {
    info: {
        title: 'MongoDB-Based API',
        description: 'API documentation for managing users and assets in MongoDB',
        version: '1.0.0',
    },
    host: `${HOST}:${PORT}`,
    basePath: `${BASE_PATH}`,
    schemes: [BASE_URL.startsWith('https') ? 'https' : 'http'], // Determine scheme dynamically
    servers: [
        {
            url: BASE_PATH,
            description: NODE_ENV === 'production' ? 'Production server' : 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', // Indicates this is a JWT token
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    definitions: {
        ValuationHistory: {
            date: '2024-11-25T08:30:00Z',
            value: 118000,
        },
        Asset: {
            type: 'Private Equity',
            market_worth: 120000,
            valuation_history: [{ $ref: '#/definitions/ValuationHistory' }],
        },
        Metadata: {
            preferences: {
                theme: 'dark',
                languages: ['English', 'Spanish'],
            },
            last_login: '2023-11-01T08:30:00Z',
        },
        User: {
            username: 'TomasMarkus',
            password: 'hashed_password',
            role: 'user',
            metadata: { $ref: '#/definitions/Metadata' },
            feedback: 'No comments provided',
            tags: ['B2B', 'Priority'],
            assets: [{ $ref: '#/definitions/Asset' }],
        },
        NewUser: {
            username: 'new_user',
            password: 'plaintext_password',
            role: 'user',
        },
    },
};


const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/auth.js', './src/routes/users.js'];

// if (process.env.GENERATE_SWAGGER === 'true') {
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log("Swagger-autogen: Success ✔");
});
// }