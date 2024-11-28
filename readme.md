# **Alternative Assets API**

A Node.js and MongoDB-based API for managing alternative assets, providing endpoints for user authentication, asset management, and wealth worth.

---

## **What the Project Does**

The **Alternative Assets API** is a backend service designed to:

- **Authenticate Users**: Secure user authentication using `JWT` and `httpOnly` cookies.
- **Manage Assets**: Allow users to manage their alternative assets, retrieving details.
- **Provide wealth worth**: Offer detailed histories for assets to track performance over time.

---

## **Why the Project Is Useful**

- **Comprehensive Asset Management**:
  - Enables users to keep track of various types of alternative assets such as cryptocurrencies, private equity, and more.
- **Secure Authentication**:

  - Implements secure practices using `JWT` tokens and `httpOnly` cookies, ensuring user data privacy and integrity.

- **Scalable Architecture**:

  - Built with Node.js and MongoDB, making it highly scalable for growing datasets and user bases.

- **Flexible Integration**:
  - Provides RESTful endpoints that can be easily integrated with frontend applications or other services.

---

## **How Users Can Get Started with the Project**

### **Run Locally**

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/alternative-assets-api.git
   cd alternative-assets-api
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the root directory:
     ```env
     PORT=5001
     MONGO_URI=mongodb://localhost:27017/alternative-assets
     JWT_SECRET=your_jwt_secret
     ```
   - Replace `your_jwt_secret` with a secure secret key.

4. **Start the Server**:

   ```bash
   npm start
   ```

5. **Access API Documentation**:
   - Swagger documentation is available at `http://localhost:5001/api-docs`.

---

### **Run with Docker Compose**

1. **Install Docker and Docker Compose**:

   - Ensure Docker is installed on your system. Follow the installation guide [here](https://docs.docker.com/get-docker/).
   - Install Docker Compose if not included with Docker [here](https://docs.docker.com/compose/install/).

2. **Clone the Repository**:

   ```bash
   git clone https://github.com/b-laztornex/alternative-assets-api.git
   cd alternative-assets-api
   ```

3. **Set Up Environment Variables**:

   - Create a `.env.development` file in the root directory:
     ```env
     PORT=5001
     MONGO_URI=mongodb://mongo:27017/alternative-assets
     JWT_SECRET=your_jwt_secret
     ```

4. **Run Docker Compose**:

   - intall dependencies

   ```npm install

   ```

   - Build the API and MongoDB services:

     ```bash
     docker-compose build
     ```

   - Start the API and MongoDB services:
     ```bash
     docker-compose up
     ```

5. **Preload Data**:

   - in order to user the app straight forward, preloading data is highly adbisable. after the container is up the following command needs to be run:

     ```docker exec -it api node src/config/preload.js

     ```

6. **Verify the Application**:
   - The API will be available at `http://localhost:5001/api`.
   - Swagger documentation will be available at `http://localhost:5001/api-docs`.

---

## **Available Endpoints**

- **Authentication**:

  - `/api/login`: Authenticate a user and return a token.
  - `/api/logout`: Log out a user by clearing their session.

- **User Management**:

  - `/api/users`: Fetch all users (Admin-only endpoint).
  - `/api/users/:id`: Fetch details of a specific user.

- **Asset Management**:
  - `/api/assets`: Fetch all assets for the authenticated user.
  - `/api/assets/:id`: Fetch details of a specific asset.

---

## **Endpoints Documantation**

1. **Access Swagger Documentaion**:
   - all the avaliable endpoints are posted here http://localhost:5001/api-docs/

---
