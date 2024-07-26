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
  
    document.location.replace('/dashboard');
  };
  
  document
    .querySelector('#new-blog-form')
    .addEventListener('submit', newFormHandler);
  