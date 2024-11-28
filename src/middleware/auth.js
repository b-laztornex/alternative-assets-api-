const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    //const token = req.header('Authorization');
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            message: "No token, authorization denied",
            code: "AUTH_NO_TOKEN" // Custom error code for easier identification
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

const authorize = (role) => (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ message: "Forbidden" });
    next();
};

module.exports = { authenticate, authorize };
