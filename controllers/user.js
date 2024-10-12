const multer = require('multer');
const User = require('../models/user');


const storage = multer.memoryStorage();
const upload = multer({ storage });

const submitUserData = async (req, res, next) => {
  try {
    const { name, socialMediaHandle } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded.' });
    }


    const images = req.files.map(file => {
      const base64Image = file.buffer.toString('base64');
      return `data:${file.mimetype};base64,${base64Image}`;
    });

    const newUser = new User({
      name,
      socialMediaHandle,
      images
    });

    await newUser.save();

    const io = req.app.get('io');
    io.emit('newSubmission', newUser);

    res.status(201).json({
      message: 'User submitted successfully.',
      user: newUser
    });
  } catch (error) {
    console.error('Error submitting user data:', error);
    next(error);
  }
};


const getAllUsers = async (req, res, next) => {
  try {
    
    const users = await User.find({})

    res.status(200).json({
      users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    next(error);
  }
};

module.exports = {
  submitUserData,
  getAllUsers
};
