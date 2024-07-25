const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../helpers/auth');

// POST route for creating a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body, // Spread the request body to include title and body
      user_id: req.session.user_id, // Associate with the logged-in user
    });
    res.status(200).json(newBlog); // Send response with the created blog
  } catch (err) {
    res.status(400).json(err); // Send error response
  }
});

// PUT route for updating an existing blog post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedBlog = await Blog.update(req.body, {
      where: {
        id: req.params.id, // Find blog by ID
        user_id: req.session.user_id, // Ensure the user is the author
      },
    });

    if (updatedBlog[0] === 0) {
      res.status(404).json({ message: 'No blog found or user not authorized to update this blog!' });
      return;
    }

    const updatedData = await Blog.findByPk(req.params.id); // Fetch updated blog
    res.status(200).json(updatedData); // Send response with updated blog
  } catch (err) {
    res.status(500).json(err); // Send error response
  }
});

// DELETE route for deleting a blog post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id, // Find blog by ID
        user_id: req.session.user_id, // Ensure the user is the author
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blogs were found with this id!' });
      return;
    }

    res.status(200).json(blogData); // Send response confirming deletion
  } catch (err) {
    res.status(500).json(err); // Send error response
  }
});

module.exports = router;
