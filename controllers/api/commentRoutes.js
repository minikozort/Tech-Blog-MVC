const router = require('express').Router();
const { Comment } = require('../../models/');
const { apiRequireLogin } = require('../../helpers/auth');

// Route handler for creating a new comment
// Ensures that only logged-in users can create comments using the apiRequireLogin middleware
router.post('/', apiRequireLogin, async (req, res) => {
  try {
    // Create a new comment with the data from the request body
    // Attach the user ID from the session to the comment
    const newComment = await Comment.create({
      ...req.body, // Spread the request body to include comment data
      userId: req.session.user_id, // Add the user ID to associate the comment with the current user
    });

    // Respond with the newly created comment
    res.json(newComment);
  } catch (err) {
    // Respond with a 500 status code and the error message if something goes wrong
    res.status(500).json(err);
  }
});

module.exports = router;
