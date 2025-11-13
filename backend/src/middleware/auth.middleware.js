import jwt, { decode } from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ENV } from '../lib/env.js';

export const protectRoute = async (req, res, next) => {
    try {
        // check if token exists in cookies
        const token = req.cookies.token; 
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // check if token is valid
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: 'Not authorized, invalid token' });
        }

        // check if user exists
        const user = await User.findById(decoded.userId).select('-password');
        if(!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(500).json({ message: 'Not authorized, token failed' });
    }
}