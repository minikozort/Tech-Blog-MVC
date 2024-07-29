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
    // Update the post with the specified ID using data from the request body
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id, // Filter to match the post by its ID
      },
    });

    // Check if any rows were affected (updated)
    if (affectedRows > 0) {
      res.status(200).end(); // Respond with a 200 status code if the update was successful
    } else {
      res.status(404).end(); // Respond with a 404 status code if no post with the specified ID was found
    }
  } catch (err) {
    res.status(500).json(err); // Respond with a 500 status code and error message if something goes wrong
  }
});

// Route to delete a post by ID
// Requires user to be logged in (apiRequireLogin middleware)
router.delete('/:id', apiRequireLogin, async (req, res) => {
  try {
    // Delete the post with the specified ID
    const affectedRows = await Post.destroy({
      where: {
        id: req.params.id, // Filter to match the post by its ID
      },
    });

    // Check if any rows were affected (deleted)
    if (affectedRows > 0) {
      res.status(200).end(); // Respond with a 200 status code if the delete was successful
    } else {
      res.status(404).end(); // Respond with a 404 status code if no post with the specified ID was found
    }
  } catch (err) {
    res.status(500).json(err); // Respond with a 500 status code and error message if something goes wrong
  }
});

module.exports = router; // Export the router to be used in other parts of the application
