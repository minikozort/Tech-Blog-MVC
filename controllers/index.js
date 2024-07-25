const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api/');
const dashboardRoutes = require('./dashboardRoutes');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/mydashboard' , dashboardRoutes);


module.exports = router;

