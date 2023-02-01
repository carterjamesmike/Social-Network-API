const { User, Thought } = require('../models');

module.exports = {

    //Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then(async (thoughts) => {
                const thoughtObj = {
                    thoughts,
                };
                return res.json(thoughtObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    //Create a thought
    createThought(req, res) {
        console.log(req.body.userID)
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userID },
                { $push: { thoughts: thought._id }},
                { new: true }
            );
            })
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    //Get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtID })
          //.select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

    //Update a thought
    updateThought(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtID },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: "No thought with that ID" })
                : res.json(thought)
        )
        .catch((err) =>
            res.status(500).json(err)
            ); 
    },

    //Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtID })
            .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: "No thought with that ID" })
                }
            })
            .then(() => res.json({ message: "Thought deleted" }))
            .catch((err) => 
                res.status(500).json(err)
            );
        },

    //Create a reaction
    createReaction(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtID },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: "No thought with that ID"})
                : res.json(thought)
        )
        .catch((err) => 
            res.status(500).json(err)
        );
      },

    //Delete a reaction
    deleteReaction(req, res) {
        console.log(req.body.reactionID)
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $pull: { reactions: {reactionID: req.params.reactionID}  }},
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: "No thought with that ID "})
                : res.json(thought)
        )
        .catch((err) => 
            res.status(500).json(err)
        );  
      },

}