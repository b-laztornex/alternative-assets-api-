What the project does
Why the project is useful
How users can get started with the project
Where users can get help with your project
Who maintains and contributes to the project

Mongoose:

Why? To interact with MongoDB in a structured and convenient way.
What it does? Provides a schema-based solution to model application data and handle database operations like create, read, update, and delete (CRUD).
Bcrypt:

Why? To securely hash and validate passwords.
What it does? Encrypts user passwords before storing them in the database and verifies hashed passwords during login.
Jsonwebtoken (JWT):

Why? To authenticate users and secure API endpoints.
What it does? Generates a token upon successful login, which is used to validate subsequent requests to protected routes.
Dotenv:

Why? To manage sensitive configuration data like database connection strings and secret keys.
What it does? Loads environment variables from a .env file into the application securely.
Cors:

Why? To enable secure cross-origin requests.
What it does? Allows the frontend application to communicate with the backend API hosted on a different origin.
Body-Parser:

Why? To parse incoming request bodies into readable JSON format.
What it does? Extracts and formats request data for easy handling in the backend.



to run it locally docker-compose build



swagger:

NODE_ENV=development node generate-swagger.js
NODE_ENV=development node server.js