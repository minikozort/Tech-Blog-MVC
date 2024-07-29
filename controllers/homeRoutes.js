const router = require('express').Router(); // Create a new router instance from Express
const { Post, Comment, User } = require('../models/'); // Import the Post, Comment, and User models
const { allowGuests } = require('../helpers/auth'); // Import middleware to allow guests (unauthenticated users)

// Route to get all posts and render the home page
router.get('/', async (req, res) => {
  try {
    // Retrieve all posts and include associated User data
    const postData = await Post.findAll({
      include: [User], // Include user information with each post
    });

    // Convert post data to plain JavaScript objects for rendering
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the home view with the posts data and user session information
    res.render('home', { posts, loggedIn: req.session.logged_in });
  } catch (err) {
    // Respond with a 500 status code and error message if data retrieval fails
    res.status(500).json(err);
  }
});

// Route to get a specific post by ID and render the post detail page
router.get('/post/:id', async (req, res) => {
  try {
    // Retrieve the post by ID, including associated User and Comment data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User, // Include user information for the post author
        {
          model: Comment, // Include comments for the post
          include: [User], // Include user information for each comment
        },
      ],
    });

    // Check if the post exists
    if (postData) {
      const post = postData.get({ plain: true }); // Convert post data to a plain JavaScript object

      // Render the post detail view with the post data and user session information
      res.render('post', { post, loggedIn: req.session.logged_in });
    } else {
      // Respond with a 404 status code if the post with the specified ID is not found
      res.status(404).end();
    }
  } catch (err) {
    // Respond with a 500 status code and error message if data retrieval fails
    res.status(500).json(err);
  }
});

// Route to render the login page, allowing guests (unauthenticated users)
router.get('/login', allowGuests, (req, res) => {
  try {
    // Render the login view
    res.render('login');
  } catch (err) {
    // Respond with a 500 status code and error message if rendering fails
    res.status(500).json(err);
  }
});

// Route to render the signup page, allowing guests (unauthenticated users)
router.get('/signup', allowGuests, (req, res) => {
  try {
    // Render the signup view
    res.render('signup');
  } catch (err) {
    // Respond with a 500 status code and error message if rendering fails
    res.status(500).json(err);
  }
});

module.exports = router; // Export the router to be used in other parts of the application
