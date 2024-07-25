const router = require('express').Router();

const userRoutes = require('./userRoutes');
const allBlogRoutes = require('./allBlogsRoutes');
const commentRoutes = require('./commentRoute');

router.use('/users' , userRoutes);
router.use('/blogs', allBlogRoutes);
router.use('/comments', commentRoutes);



module.exports = router;
