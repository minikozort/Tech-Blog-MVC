// Function to handle the submission of a new post form
const newFormHandler = async function (event) {
  event.preventDefault(); // Prevent the default form submission behavior, which would reload the page

  // Get the title and body values from the form input fields
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  try {
    // Send a POST request to the server to create a new post
    const response = await fetch(`/api/posts`, {
      method: 'POST', // Specify the HTTP method as POST
      body: JSON.stringify({ // Convert the title and body into a JSON string for the request body
        title,
        body,
      }),
      headers: { 'Content-Type': 'application/json' }, // Indicate that the request body is JSON
    });

    // Check if the response was successful
    if (response.ok) {
      // Redirect to the dashboard page if the post was created successfully
      document.location.replace('/dashboard');
    } else {
      // Display an alert if there was an error creating the post
      alert('Failed to create post');
    }
  } catch (err) {
    // Handle any errors that occur during the fetch request
    console.error('Error:', err); // Log the error to the console
    alert('An error occurred while creating the post'); // Display a generic error message to the user
  }
};

// Attach the newFormHandler function to the submit event of the new post form
document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);
