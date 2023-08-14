const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// Create the express app
const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://fse-chatroom-frontend.s3.amazonaws.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Say hello Get request
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello from the API server!' });
});

// Start the server
app.listen(3002, () => {
  console.log('API TEST server is running on port 3002');
});