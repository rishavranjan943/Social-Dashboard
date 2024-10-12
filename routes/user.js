const express = require('express');
const upload = require('../middleware/multer');
const { submitUserData,getAllUsers } = require('../controllers/user');
const authMiddleware = require('../middleware/auth');


const router = express.Router();


router.post('/submit', upload.array('images', 10), submitUserData);



module.exports = router;
