const { ObjectID } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {

    //Get all users
    getUsers(req,res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    //Create a user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    //Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userID })
          .select('-__v')
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No user with that ID found" })
              : res.json(user)
          )
          .catch((err) =>     
             res.status(500).json(err)
             );
      },

    //Update a user
    updateUser(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.userID },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: "No user with that ID found" })
                : res.json(user)
        )
        .catch((err) =>
            res.status(500).json(err)
            ); 

    },

    //Delete a user and associated thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userID })
            .then((user) => 
            !user
                ? res.status(404).json({ message: "No user with that ID found" })
                : Thought.deleteMany({ _id: { $in: user.thoughts }  })
            )
            .then(() => res.json({ message: "User and associated thoughts deleted" }))
            .catch((err) =>
                res.status(500).json(err)
            );
    },

}

