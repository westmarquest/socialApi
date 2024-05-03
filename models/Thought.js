const mongoose = require("mongoose");

const ReactionSchema = new mongoose.Schema({
  reactionBody: { type: String, required: true, maxLength: 280 },
  username: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString(),
  },
});

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString(),
  },
  username: { type: String, required: true },
  reactions: [ReactionSchema],
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const thought = mongoose.model("thought", thoughtSchema);

module.exports = thought;
