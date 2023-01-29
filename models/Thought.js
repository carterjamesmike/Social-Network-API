const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionID: { 
            type: Schema.Types.ObjectID, 
            default: () => new Types.ObjectId() 
        },
        reactionBody: { 
            type: String, 
            required: true, 
            max: 280 
        }, 
        username: { 
            type: String, 
            required: true
        },
        
    }, { timestamps: { 
        createdAt: 'created_at' 
        } 
       },

    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
const thoughtSchema = new Schema(
    {
        thoughtText: { 
            type: String, 
            required: true, 
            max:280 
        },
        username: { 
            type: String, 
            required: true 
        },
        reactions: [reactionSchema],
    }, { timestamps: { 
        createdAt: 'created_at' 
        } 
       },

    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema)
module.exports = Thought;