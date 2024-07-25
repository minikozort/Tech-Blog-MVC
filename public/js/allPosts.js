// Edit Blog

const blogId = document.querySelector('input[name="blog-id"]').value;

const editFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('input[name="blog-title"]').value;
  const body = document.querySelector('textarea[name="blog-body"]').value;

  await fetch(`/api/blogs/${blogId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  document.location.replace('/dashboard');
};

const deleteClickHandler = async function () {
  await fetch(`/api/blogs/${blogId}`, {
    method: 'DELETE',
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#edit-blog-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);


//   New Blog

const newFormHandler = async function (event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="blog-title"]').value;
    const body = document.querySelector('textarea[name="blog-body"]').value;
  
    await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace('/mydashboard');
  };
  
  document
    .querySelector('#new-blog-form')
    .addEventListener('submit', newFormHandler);