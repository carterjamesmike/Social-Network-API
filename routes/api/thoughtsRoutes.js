const router = require('express').Router();

const {
    createThought,
    getThoughts,
    getSingleThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtID').get(getSingleThought);

module.exports = router;