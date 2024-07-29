const router = require('express').Router(); // Create a new router instance from Express
const { Post } = require('../models'); // Import the Post model from the models directory
const { requireLogin } = require('../helpers/auth'); // Import middleware to ensure user is authenticated

// Route to get all posts for the logged-in user
// Uses requireLogin middleware to ensure the user is authenticated
router.get('/', requireLogin, async (req, res) => {
  try {
    // Retrieve all posts created by the logged-in user
    const postData = await Post.findAll({
      where: {
        userId: req.session.user_id, // Filter posts by the logged-in user's ID
      },
    });

    // Convert post data to plain JavaScript objects for rendering
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard view with the posts data and user session information
    res.render('dashBoard', {
      dashboard: true,
      posts,
      loggedIn: req.session.logged_in, // Indicate if the user is logged in
    });
  } catch (err) {
    // Respond with a 500 status code and error message if data retrieval fails
    res.status(500).json(err);
  }
});

// Route to render the new post creation page
// Uses requireLogin middleware to ensure the user is authenticated
router.get('/new', requireLogin, (req, res) => {
  res.render('newPost', {
    dashboard: true,
    loggedIn: req.session.logged_in, // Indicate if the user is logged in
  });
});

// Route to render the edit post page for a specific post ID
// Uses requireLogin middleware to ensure the user is authenticated
router.get('/edit/:id', requireLogin, async (req, res) => {
  try {
    // Retrieve the post by its primary key (ID)
    const postData = await Post.findByPk(req.params.id);

    // Check if the post exists
    if (postData) {
      const post = postData.get({ plain: true }); // Convert post data to a plain JavaScript object

      // Render the edit post view with the post data and user session information
      res.render('editPost', {
        dashboard: true,
        post,
        loggedIn: req.session.logged_in, // Indicate if the user is logged in
      });
    } else {
      // Respond with a 404 status code if the post with the specified ID is not found
      res.status(404).end();
    }
  } catch (err) {
    // Respond with a 500 status code and error message if data retrieval fails
    res.status(500).json(err);
  }
});

module.exports = router; // Export the router to be used in other parts of the application
