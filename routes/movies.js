const express = require('express');
const { index, show, storeReview } = require('../controllers/moviesController');

const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.post('/:id/reviews', storeReview);

module.exports = router;
