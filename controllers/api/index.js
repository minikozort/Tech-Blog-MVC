const router = require('express').Router();  // Initialize a new Express router instance

// Import route modules for different resource types
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Define routes for handling various endpoints by delegating to imported route modules
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// Export the router to be used in other parts of the application
module.exports = router;
