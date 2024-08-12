const router = require('express').Router(); // Create a new router instance from Express
const { Post } = require('../../models/'); // Import the Post model from the models directory
const { apiRequireLogin } = require('../../helpers/auth'); // Import middleware to ensure user is authenticated

// Route to create a new post
// Requires user to be logged in (apiRequireLogin middleware)
router.post('/', apiRequireLogin, async (req, res) => {
  const body = req.body; // Extract the request body

  try {
    // Create a new post with data from the request body and associate it with the logged-in user
    const newPost = await Post.create({ ...body, userId: req.session.user_id });
    res.json(newPost); // Respond with the newly created post
  } catch (err) {
    res.status(500).json(err); // Respond with a 500 status code and error message if something goes wrong
  }
});

// Route to update an existing post by ID
// Requires user to be logged in (apiRequireLogin middleware)
router.put('/:id', apiRequireLogin, async (req, res) => {
  try {
    const postId = req.params.id;
    
    // Attempt to find the post first
    const post = await Post.findByPk(postId);

    if (post) {
      // If the post exists, update it with the new data
      await post.update(req.body);
      res.status(200).json(post); // Respond with the updated post
    } else {
      res.status(404).json({ message: 'Post not found' }); // Respond with a 404 and a message if the post wasn't found
    }
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Route to delete a post by ID
// Requires user to be logged in (apiRequireLogin middleware)
router.delete('/:id', apiRequireLogin, async (req, res) => {
  try {
    const postId = req.params.id;

    // Attempt to find the post first
    const post = await Post.findByPk(postId);

    if (post) {
      // If the post exists, delete it
      await post.destroy();
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' }); // Respond with a 404 and a message if the post wasn't found
    }
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router; // Export the router to be used in other parts of the application
