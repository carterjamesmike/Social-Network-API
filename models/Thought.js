const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thougthText: { type: String, required: true, max:280 },
        username: { type: String, required: true },
        reactions: [reactionSchema],
    }, { timestamps: { createdAt: 'created_at' } },

    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

const reactionSchema = new Schema(
    {
        reactionID: { type: mongoose.ObjectID, default: new ObjectID()},
        reactionBody: { type: String, required: true, max: 280 }, 
        username: { type: String, required: true},
        
    }, { timestamps: { createdAt: 'created_at' } },

    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema)
module.exports = Thought;