const { User, Thought } = require('../../models');

moudule.exports = {

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
}
