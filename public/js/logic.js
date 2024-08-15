document.addEventListener('DOMContentLoaded', function() {
    // Login form toggle
    const loginPasswordInput = document.getElementById('password-input-login');
    const loginTogglePasswordButton = document.getElementById('toggle-password');
  
    if (loginPasswordInput && loginTogglePasswordButton) {
      loginTogglePasswordButton.addEventListener('click', function() {
        if (loginPasswordInput.type === 'password') {
          loginPasswordInput.type = 'text';
          loginTogglePasswordButton.textContent = 'Hide';
        } else {
          loginPasswordInput.type = 'password';
          loginTogglePasswordButton.textContent = 'Show';
        }
      });
    } else {
      console.error('Login form elements not found');
    }
  
    // Signup form toggle
    const signupPasswordInput = document.getElementById('password-input-signup');
    const signupTogglePasswordButton = document.getElementById('password-toggle-btn');
  
    if (signupPasswordInput && signupTogglePasswordButton) {
      signupTogglePasswordButton.addEventListener('click', function() {
        if (signupPasswordInput.type === 'password') {
          signupPasswordInput.type = 'text';
          signupTogglePasswordButton.textContent = 'Hide';
        } else {
          signupPasswordInput.type = 'password';
          signupTogglePasswordButton.textContent = 'Show';
        }
      });
    } else {
      console.error('Signup form elements not found');
    }
  });