const signupFormHandler = async (event) => {
  event.preventDefault();

  const first_name = document.querySelector('#firstName').value.trim();
  const last_name = document.querySelector('#lastName').value.trim();
  const e_mail = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  // if (name && email && password) {
  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      e_mail: e_mail,
      password: password,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert(response.statusText);
  }
  // }
};

document
  .getElementById('signupForm')
  .addEventListener('submit', signupFormHandler);
