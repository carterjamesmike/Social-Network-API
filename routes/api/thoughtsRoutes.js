const router = require('express').Router();

const {
    createThought,
    getThoughts,
    getSingleThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtID
router
    .route('/:thoughtID')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtID/reactions
router.route('/:thoughtID/reactions').post(createReaction).delete(deleteReaction)

// /api/thougths/:thoughtID/reactions/:reactionID
// router.route('/:thoughtID/reactions/:reactionID').delete(deleteReaction)

module.exports = router;