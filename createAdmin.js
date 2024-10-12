const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/admin');

dotenv.config();


mongoose
  .connect(process.env.MONGODB_URL)
  .then(async () => {
    const username = process.env.ADMIN_USER
    const password = process.env.ADMIN_PASSWORD

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('Admin already exists.');
      process.exit(0);
    }

    const admin = new Admin({ username, password });
    await admin.save();
    console.log('Admin user created successfully.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error creating admin:', err);
    process.exit(1);
  });
