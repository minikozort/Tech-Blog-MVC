const signupFormHandler = async function (event) {
    event.preventDefault();

    const usernameEl = document
      .querySelector('#username-input-signup').value.trim();
    const passwordEl = document
      .querySelector('#password-input-signup').value.trim();

    // Regular expression to check for at least one special character
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (usernameEl && passwordEl.length >= 10 && specialCharRegex.test(passwordEl)) {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({
            userName: usernameEl,
            password: passwordEl,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to sign up');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert(
        'Please include both a username and password, and make sure your password is at least 10 characters long and contains at least one special character'
      );
    }
  };

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
