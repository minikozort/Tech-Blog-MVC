const router = require('express').Router();
const { Blog, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const blogData = await Blog.findAll({
        include: [User],
      });
  
      // Serialize data so the template can read it
      const blogs = blogData.map((blog) => blog.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('home', { 
        blogs, 
        loggedIn: req.session.loggedIn 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/blogs/:id', async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include: [User,
            {
                model: Comment,
                include: [User],
              },
        ]
      });
  
      const blog = blogData.get({ plain: true });
  
      res.render('viewBlog', {
        blog,
        loggedIn: req.session.loggedIn
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
      res.redirect('/mydashboard');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    try {
      res.render('signUp');
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;