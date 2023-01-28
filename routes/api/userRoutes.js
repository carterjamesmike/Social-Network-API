const router = require('express').Router();

const {
    createUser,
    getUsers,
    getSingleUser
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userID
router.route('/:userID').get(getSingleUser)


module.exports = router;