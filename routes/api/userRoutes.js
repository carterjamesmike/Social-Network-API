const router = require('express').Router();

const {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userID
router
    .route('/:userID')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);


module.exports = router;