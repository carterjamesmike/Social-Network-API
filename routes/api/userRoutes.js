const router = require('express').Router();

const {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userID
router
    .route('/:userID')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userID/friendID
router.route('/:userID/friends/:friendID').post(addFriend).delete(deleteFriend)

module.exports = router;