const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

/**
 * @swagger
 * api/login:
 *   post:
 *     summary: Authenticate a user and return a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set the cookie with the JWT token
        res.cookie('token', token, {
            httpOnly: true,       // Prevent access from JavaScript (for security)
            secure: process.env.NODE_ENV === 'production', // Set secure in production
            sameSite: 'strict',   // Prevent CSRF
            maxAge: 3600000       // Cookie expiration in milliseconds (1 hour)
        });

        // Send a response to the frontend
        res.json({
            message: "Login successful",
            user: { id: user._id, username: user.username, role: user.role }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @swagger
 * api/logout:
 *   post:
 *     summary: Log out the user and clear the authentication token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Logout message
 */
router.post('/logout', (req, res) => {
    // Clear the token cookie
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/', // Ensure the path matches where the cookie was set
    });
    res.status(200).json({ message: 'Logged out successfully' });
});


/**
 * @swagger
 * api/check-session:
 *   get:
 *     summary: Check if the user's session is valid
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Session is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authenticated:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Unauthorized or missing token
 */
router.get('/check-session', (req, res) => {
    const token = req.cookies.token; // Extract token from httpOnly cookie

    if (!token) {
        return res.status(401).json({ authenticated: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({
            authenticated: true,
            user: { id: decoded.id, role: decoded.role }
        });
    } catch (err) {
        console.error(err);
        res.status(401).json({ authenticated: false, message: "Invalid or expired token" });
    }
});


module.exports = router;
