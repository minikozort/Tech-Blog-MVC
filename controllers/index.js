const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api/');
const dashBoardRoutes = require('./dashBoardRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashBoardRoutes);

module.exports = router;
