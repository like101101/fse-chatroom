const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https')

const cred = require('./ssl-cert/cred')

const port = 3000 // as the http port

// Create the express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Say hello Get request
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello from the API server!' });
});

// Domain Verification API
app.get('/.well-known/pki-validation/9F7F69819B4A7B80A27D42469C74C311.txt', (req, res) => {
    res.sendFile('/home/ec2-user/fse-chatroom/backend/9F7F69819B4A7B80A27D42469C74C311.txt')
})

// Start the server
const httpsServer = https.createServer(cred, app)
httpsServer.listen(port, () => {
  console.log('API TEST server is running on port ', port);
})