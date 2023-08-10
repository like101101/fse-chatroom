// define macros
const host = '44.208.22.126';
const userport = '3000';

// If the user is already logged in, redirect to the app page
const token = localStorage.getItem('token');
 
if (token) {
  window.location.href = 'app.html';
}

// Login button handler
const login = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch(`http://${host}:${userport}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
  
    const data = await response.json();
  
    if (response.ok) {
      console.log(data.message);
      const token = data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      window.location.href = 'app.html';
    } else {
      console.error(data.message);
      alert(data.message)
    }
};

// Register button handler
const register = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`http://${host}:${userport}/register`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        console.log(data.message);
        alert(data.message)
    } else {
        console.error(data.message);
        alert(data.message)
    }
};

// Attach the event listeners
document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('register-btn').addEventListener('click', register);