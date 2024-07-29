// Function to handle the logout process
const logout = async () => {
  try {
    // Send a POST request to the logout endpoint
    const response = await fetch('/api/users/logout', {
      method: 'POST', // Use POST method for logout
      headers: { 'Content-Type': 'application/json' }, // Specify that the request body is JSON
    });

    // Check if the response indicates success
    if (response.ok) {
      // Redirect to the homepage upon successful logout
      document.location.replace('/');
    } else {
      // Display an alert with the response status text if logout fails
      alert(response.statusText);
    }
  } catch (err) {
    // Handle any errors that occur during the fetch request
    console.error('Error:', err);
    alert('An error occurred while trying to logout');
  }
};

// Attach the logout function to the click event of the logout button
document.querySelector('#logout').addEventListener('click', logout);
