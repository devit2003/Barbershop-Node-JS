const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied, No Token Provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Menyimpan informasi pengguna dalam request
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Invalid Token' });
    }
};