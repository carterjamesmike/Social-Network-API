const router = require('express').Router();

const {
    createUser,
    getUser,
} = require('../../controllers/userController');

router.route('/').get(getUser).post(createUser);

module.exports = router;