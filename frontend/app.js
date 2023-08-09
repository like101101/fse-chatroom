const token = localStorage.getItem('token');

// If the user is not logged in, redirect to the login page
if (!token) {
  window.location.href = 'index.html';
}

// define macros
const host = 'localhost';
const messagePort = '3001';


// Date formating function
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Logout function
const logout = () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
};

// Post function
const post = async () => {
  const content = document.getElementById('input-content').value;
  const time = formatDate(new Date());

  try {
    const response = await fetch(`http://${host}:${messagePort}/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify({ content, time }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

// display messages function
function displayMessages(messages) {
  // Clear previous messages
  messageContainer.textContent ='';

  // Loop through messages and create message elements
  messages.forEach(message => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message-div');

    const messageMetaDiv = document.createElement('div');
    messageMetaDiv.classList.add('message-meta-div');
    messageDiv.appendChild(messageMetaDiv);

    const messageUserDiv = document.createElement('div');
    messageUserDiv.classList.add('message-user-div');
    messageUserDiv.textContent = message.username;
    messageMetaDiv.appendChild(messageUserDiv);

    const messageTimeDiv = document.createElement('div');
    messageTimeDiv.classList.add('message-time-div');
    messageTimeDiv.textContent = message.time;
    messageMetaDiv.appendChild(messageTimeDiv);

    const messageContentDiv = document.createElement('div');
    messageContentDiv.classList.add('message-content-div');
    messageContentDiv.textContent = message.content;
    messageDiv.appendChild(messageContentDiv);

    messageContainer.appendChild(messageDiv);
  });
}

// websocket to display messages function
const messageContainer = document.getElementById('message-list');

const socket = new WebSocket(`ws://${host}:${messagePort}`);
socket.addEventListener('message', (event) => {
  const messages = JSON.parse(event.data);
  displayMessages(messages);
});

// Attach the event listeners
document.getElementById('logout').addEventListener('click', logout);
document.getElementById('post').addEventListener('click', post);
