import jwt from 'jsonwebtoken';

export const protectAdmin = (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get the token from the header 
            token = req.headers.authorization.split(' ')[1];

            // verify the token is real using secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check if the decoded token verify it is admin
            if (decoded.isAdmin) {
                next();
            } else {
                throw new Error('Not authorized, not an admin');
            }
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};