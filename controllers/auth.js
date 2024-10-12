const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const User=require('../models/user')

const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password.' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const payload = {
      adminId: admin._id,
      username: admin.username
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Login successful.' });
  } catch (error) {
    console.error('Error during admin login:', error);
    next(error);
  }
};

const getAdminDashboard = async (req, res) => {
  try {
    const users = await User.find().limit(10); 
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { loginAdmin,getAdminDashboard };