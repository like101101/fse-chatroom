const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/user');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Login Function
app.post('/login', async(req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username, password } });

    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Register function
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    await User.sync();
    await User.create({ username, password });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});