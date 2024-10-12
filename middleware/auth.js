const jwt = require('jsonwebtoken');
const Admin = require('../models/admin'); 


const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId).select('-password'); 
    if (!admin) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    req.admin = admin;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(403).json({ message: 'Failed to authenticate token.' });
  }
};

module.exports = {authenticateToken}
