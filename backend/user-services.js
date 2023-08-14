const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secret = 'kel4';


// Database Models 
const User = require('./models/user');

// Create the express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Login Function
app.post('/login', async(req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username, password } });

    if (user) {
      const token = jwt.sign({ username: user.username }, secret);
      res.status(200).json({ message: 'Login successful', token});
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'There is an error on our end...' });
  }
});

// Register function
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    await User.sync();

    const user = await User.findOne({ where: { username, password } });
    if (user){
      res.status(401).json({ message: 'User already exists' });
    }

    await User.create({ username, password });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'There is an error on our end...' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('User server is running on port 3001');
});