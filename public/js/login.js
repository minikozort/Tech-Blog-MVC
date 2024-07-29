// Function to validate password based on required criteria
const validatePassword = (password) => {
  const specialCharRegex = /[!@#$%^&*()]/; // Regex to check for special characters
  const numberRegex = /\d/; // Regex to check for numbers
  return specialCharRegex.test(password) && numberRegex.test(password);
};

// Function to handle the login form submission
const loginFormHandler = async function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the trimmed username and password values from the input fields
  const usernameEl = document
    .querySelector('#username-input-login')
    .value.trim();
  const passwordEl = document
    .querySelector('#password-input-login')
    .value.trim();

  // Validate password based on requirements
  if (!validatePassword(passwordEl)) {
    alert('Password must include at least one special character (!@#$%^&*()) and one number.');
    return;
  }

  try {
    // Send a POST request to the login endpoint with the username and password
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl,
        password: passwordEl,
      }),
      headers: { 'Content-Type': 'application/json' }, // Indicate that the request body contains JSON
    });

    // Check if the response was successful
    if (response.ok) {
      // Redirect to the homepage if login is successful
      document.location.replace('/');
    } else {
      // Display an alert if login fails
      alert('Failed to login. Please check your username and password.');
    }
  } catch (err) {
    // Log any errors that occur during the fetch request
    console.error('Error:', err);
    alert('An error occurred while trying to login. Please try again later.');
  }
};

// Function to convert username to lowercase in real-time
const enforceLowercaseUsername = () => {
  const usernameInput = document.querySelector('#username-input-login');

  // Convert username to lowercase as the user types
  usernameInput.addEventListener('input', () => {
    usernameInput.value = usernameInput.value.toLowerCase();
  });
};

// Attach the loginFormHandler function to the submit event of the login form
document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);

// Get the toggle password button and password input field
const togglePassword = document.querySelector('#toggle-password');
const passwordInput = document.querySelector('#password-input-login');

// Add a click event listener to the toggle password button
togglePassword.addEventListener('click', function () {
  // Toggle the type attribute between 'password' and 'text'
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  
  // Toggle the button text between 'Show' and 'Hide'
  this.textContent = type === 'password' ? 'Show' : 'Hide';
});

// Enforce lowercase username input
enforceLowercaseUsername();
