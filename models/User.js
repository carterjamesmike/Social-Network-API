const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
      username: { type: String, required: true, unique: true, trim: true },
      email: { type: String, required: true, unique: true, match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/] },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],

      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],

    },
    {

      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );

  const User = model('User', userSchema);
  module.exports = User;