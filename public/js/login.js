const loginFormHandler = async function (event) {
    event.preventDefault();
  
    const usernameEl = document
      .querySelector('#username-input-login')
      .value.trim();
    const passwordEl = document
      .querySelector('#password-input-login')
      .value.trim();
  
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl,
        password: passwordEl,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to login');
    }
  };
  
  document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
  
  const togglePassword = document.querySelector('#toggle-password');
  const passwordInput = document.querySelector('#password-input-login');
  
  togglePassword.addEventListener('click', function () {
    // Toggle the type attribute
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle the button text
    this.textContent = type === 'password' ? 'Show' : 'Hide';
  });