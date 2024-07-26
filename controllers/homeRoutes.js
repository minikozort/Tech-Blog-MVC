const router = require('express').Router();
const { Blog, Comment, User } = require('../models/');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [User],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('home', { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (blogData) {
      const blog = blogData.get({ plain: true });

      res.render('viewBlog', { blog, loggedIn: req.session.loggedIn });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
