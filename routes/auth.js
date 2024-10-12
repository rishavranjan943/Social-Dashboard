const express = require('express');
const { loginAdmin,getAdminDashboard } = require('../controllers/auth');
const { authenticateToken } = require('../middleware/auth');


const router = express.Router();


router.post('/login', loginAdmin);

router.get('/dashboard', authenticateToken, getAdminDashboard);

module.exports = router;
