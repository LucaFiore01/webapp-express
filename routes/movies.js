const express = require('express');
const { index, show } = require('../controllers/moviesController');

const router = express.Router();

router.get('/', index);
router.get('/:id', show);

module.exports = router;
