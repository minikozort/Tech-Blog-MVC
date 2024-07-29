// Function to validate the password based on required criteria
const validatePassword = (password) => {
  const specialCharRegex = /[!@#$%^&*()]/; // Regex to check for special characters
  const numberRegex = /\d/; // Regex to check for numbers
  return specialCharRegex.test(password) && numberRegex.test(password);
};

// Function to handle the submission of the signup form
const signupFormHandler = async function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the values from the username and password input fields
  const usernameEl = document
    .querySelector('#username-input-signup')
    .value.trim()
    .toLowerCase(); // Convert username to lowercase
  const passwordEl = document
    .querySelector('#password-input-signup')
    .value.trim(); // Trim whitespace from the password

  // Validate password based on requirements
  if (!validatePassword(passwordEl)) {
    alert('Password must include at least one special character (!@#$%^&*()) and one number.');
    return;
  }

  // Check if both username and password are provided and if the password is at least 8 characters long
  if (passwordEl.length >= 8 && usernameEl) {
    try {
      // Send a POST request to the server to create a new user
      const response = await fetch('/api/users', {
        method: 'POST', // Specify the HTTP method as POST
        body: JSON.stringify({
          username: usernameEl, // Use lowercase username
          password: passwordEl,
        }),
        headers: { 'Content-Type': 'application/json' }, // Indicate that the request body is JSON
      });

      // Check if the response was successful
      if (response.ok) {
        // Redirect to the homepage if the signup was successful
        document.location.replace('/');
      } else {
        // Display an alert if the signup failed
        alert('Failed to sign up. Please try again.');
      }
    } catch (err) {
      // Handle any errors that occur during the fetch request
      console.error('Error:', err); // Log the error to the console
      alert('An error occurred while signing up. Please try again later.'); // Display a generic error message to the user
    }
  } else {
    // Display an alert if the username or password is missing or if the password is too short
    alert(
      'Please include both a username and password, and make sure your password is at least 8 characters long.'
    );
  }
};

// Attach the signupFormHandler function to the submit event of the signup form
document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);

// Function to toggle the visibility of the signup password input field
function toggleSignupPassword() {
  const passwordInput = document.getElementById('password-input-signup'); // Get the password input field
  const toggleButton = document.querySelector('.password-toggle-btn'); // Get the toggle button
  
  // Toggle the type of the password input field between 'password' and 'text'
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text'; // Show the password
    toggleButton.textContent = 'Hide'; // Update the button text
  } else {
    passwordInput.type = 'password'; // Hide the password
    toggleButton.textContent = 'Show'; // Update the button text
  }
}

// Attach the toggleSignupPassword function to the click event of the toggle button
document
  .querySelector('.password-toggle-btn')
  .addEventListener('click', toggleSignupPassword);
