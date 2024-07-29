const router = require('express').Router(); // Create a new router instance from Express

// Import route modules
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api/');
const dashBoardRoutes = require('./dashBoardRoutes'); 

// Define route handling for different paths
router.use('/', homeRoutes); 
router.use('/api', apiRoutes);
router.use('/dashboard', dashBoardRoutes);


// Export the router to be used in other parts of the application
module.exports = router;
