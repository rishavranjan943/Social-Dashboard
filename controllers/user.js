const User = require('../models/user');

const submitUserData = async (req, res, next) => {
  try {
    const { name, socialMediaHandle } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded.' });
    }

    const images = req.files.map(file => file.filename);

    const newUser = new User({
      name,
      socialMediaHandle,
      images
    });

    await newUser.save();

    const io = req.app.get('io');
    io.emit('newSubmission', newUser);

    res.status(201).json({ message: 'User submitted successfully.', user: newUser });
  } catch (error) {
    console.error('Error submitting user data:', error);
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page) || 1; 
    limit = parseInt(limit) || 10; 

    const total = await User.countDocuments();
    const totalPages = Math.ceil(total / limit);
    const users = await User.find()
      .sort({ createdAt: -1 }) 
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      page,
      totalPages,
      total,
      users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    next(error);
  }
};


module.exports={
    submitUserData,
    getAllUsers
}