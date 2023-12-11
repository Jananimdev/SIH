// router.js
const express = require('express');
const User = require('../Model/Model');

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/signup', async (req, res) => {
  try {
    console.log("Called");
    // res.sent("Hehhh")
    const { name, email, password, phno, aadharNumber,isAdmin } = req.body;
    const newUser = new User({ name, email, password, phno, aadharNumber,isAdmin });
    await newUser.save();
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/signin', (req, res) => {
    // Replace this with your logic to handle the GET request
    console.log("Called");
    const responseData = { message: 'GET request handled on the server!' };
    res.json(responseData);
  });
module.exports = router;
