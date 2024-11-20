// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Buyer = require('../models/buyer');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization header missing or invalid' });
        }

        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const buyer = await Buyer.findById(decoded.id);
        if (!buyer) {
            return res.status(404).json({ error: 'Buyer not found' });
        }

        req.user = buyer; // Attach user data to request
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'Token expired' });
        } else if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: 'Invalid token' });
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
};
