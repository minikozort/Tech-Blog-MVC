const router = require('express').Router();
const { Blog } = require('../models');
const withAuth = require('../helpers/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        userId: req.session.user_id,
      },
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('dashBoard', {
      dashboard: true,
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('newBlog', {
    dashboard: true,
    loggedIn: req.session.loggedIn,
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);

    if (blogData) {
      const blog = blogData.get({ plain: true });

      res.render('editBlog', {
        dashboard: true,
        blog,
        loggedIn: req.session.loggedIn,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
