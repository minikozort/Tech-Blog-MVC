// Retrieve the post ID from the input field (this assumes the post ID is available globally)
const postId = document.querySelector('input[name="post-id"]').value;

// Handler function for the edit form submission
const editFormHandler = async function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the updated title and body from the form inputs
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  // Send a PUT request to update the post with the new title and body
  await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
    },
  });

  // Redirect to the dashboard after updating the post
  document.location.replace('/dashboard');
};

// Handler function for the delete button click
const deleteClickHandler = async function () {
  // Send a DELETE request to remove the post
  await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  });

  // Redirect to the dashboard after deleting the post
  document.location.replace('/dashboard');
};

// Attach the editFormHandler function to the submit event of the edit post form
document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);

// Attach the deleteClickHandler function to the click event of the delete button
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
