const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const e_mail = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (e_mail && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ e_mail, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
