const commentFormHandler = async function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the post ID and comment body from the form inputs
  const postId = document.querySelector('input[name="post-id"]').value;
  const body = document.querySelector('textarea[name="comment-body"]').value;

  // Check if the comment body is not empty
  if (body) {
      try {
          // Send a POST request to the API to create a new comment
          const response = await fetch('/api/comments', {
              method: 'POST',
              body: JSON.stringify({
                  postId,
                  body,
              }),
              headers: {
                  'Content-Type': 'application/json', // Indicate that the request body contains JSON
              },
          });

          // Check if the response was successful
          if (response.ok) {
              // Reload the page to update the comments section
              document.location.reload();
          } else {
              // Redirect to the login page if the response indicates failure (e.g., user not logged in)
              document.location.replace('/login');
          }
      } catch (error) {
          // Handle errors (e.g., network issues) by logging them to the console
          console.error('Error:', error);
      }
  }
};

// Attach the commentFormHandler function to the submit event of the comment form
document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);
