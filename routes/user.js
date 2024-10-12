const express = require('express');
const upload = require('../middleware/multer');
const { submitUserData } = require('../controllers/user');



const router = express.Router();


router.post('/submit', upload.array('images', 10), submitUserData);



module.exports = router;
