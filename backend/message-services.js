const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
// const cors = require('cors');
const jwt = require('jsonwebtoken');
const ws = require('ws');
const secret = 'kel4';

// Database Models 
const Message = require('./models/message');

// Create the express app
const app = express();
app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://fse-chatroom-frontend.s3.amazonaws.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Websocket server
const server = http.createServer(app);
const wss = new ws.Server({ server });

// Token verification helper function
const verifyToken = (req, res, next) => {

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  console.log(token);

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // If token is valid, save the decoded data to the request object
    req.user = decoded;
    next();
  });
}
    
// Send initial messages when a new client connects
wss.on('connection', (socket) => {
  console.log('WebSocket connected');
  Message.findAll({
    attributes: ['username', 'content', 'time'], 
    order: [['time', 'DESC']]
  })
  .then(messages => {
    socket.send(JSON.stringify(messages));
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

wss.on('close', () => {
  console.log('WebSocket closed');
});


// Message post function
app.post('/post', verifyToken, async (req, res) => {

  const { content, time } = req.body;
  const { username } = req.user;

  try {
    await Message.sync();

    await Message.create({
        username,
        content,
        time,
    });

    res.status(201).json({ message: 'Message sent' });

    // Send the message to all clients
    wss.clients.forEach(client => {

      console.log(client.readyState);

      if (client.readyState === 1) {
        Message.findAll({
          attributes: ['username', 'content', 'time'], 
          order: [['time', 'DESC']]
        })
        .then(messages => {
          client.send(JSON.stringify(messages));
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'There is an error on our end...' });
  }
});



// Start the server
server.listen(3001, () => {
  console.log('Message server is running on port 3001');
});