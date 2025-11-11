import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const {JWT_SECRET} = process.env;
    // Ensure JWT_SECRET is defined
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: '7d' // Token valid for 7 days
    });

    res.cookie('jwt', token, {
        httpOnly: true, // prevent XXS attacks: cross-site scripting
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'Strict', // CSRF protection
        secure: process.env.NODE_ENV === 'development' ? false : true, // only send cookie over HTTPS in production
    });

    return token;
};