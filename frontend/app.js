const token = localStorage.getItem('token');

// If the user is not logged in, redirect to the login page
if (!token) {
  window.location.href = 'index.html';
}


