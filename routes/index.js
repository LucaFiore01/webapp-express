const express = require('express');

const healthRoutes = require('./health');
const moviesRoutes = require('./movies');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/movies', moviesRoutes);

module.exports = router;
