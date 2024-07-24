const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashBoardRoutes = require('./dashBoardRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/mydashboard' , dashBoardRoutes);

module.exports = router;
