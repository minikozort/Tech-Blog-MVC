const commentFormHandler = async function (event) {
  event.preventDefault();

  const blogId = document.querySelector('input[name="blog-id"]').value;
  const body = document.querySelector('textarea[name="comment-body"]').value;

  if (body) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        blogId,
        body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      document.location.replace("/login");
    }
  }
};

document
  .querySelector("#new-comment-form")
  .addEventListener("submit", commentFormHandler);
