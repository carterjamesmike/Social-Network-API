const router = require('express').Router();

const {
    createThought,
    getThoughts,
    getSingleThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtID')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;