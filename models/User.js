const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, require: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: "thought" }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

userSchema.virtual("friendCount").get(function () {
  return this.friend.length;
});

const user = mongoose.model("user", userSchema);

module.exports = user;
