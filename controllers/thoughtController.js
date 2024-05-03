// thoughtController.js

// const { Thought, User } = require("../models");
const Thought = require("../models/Thought");
const User = require("../models/User");

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().populate("reactions");
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thoughts = await Thought.findById(req.params.thoughtId).populate(
        "reactions"
      );
      if (!thoughts) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createThought: async (req, res) => {
    try {
      const { thoughtText, username } = req.body;

      // Find the user by username (assuming it's unique)
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Create the thought and associate it with the user
      const thought = await Thought.create({
        thoughtText,
        username,
        userId: user._id,
      });
      user.thoughts.push(thought._id);
      await user.save();

      res.status(201).json(thought);
    } catch (error) {
      console.error("Error creating thought:", error);
      res.status(500).json({ message: "Failed to create thought" });
    }
  },

  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(thought);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      console.log("thought", thought);
      console.log("thoughtId", req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "Thoughtt not found" });
      }

      res.json({ message: "Thought deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createReaction: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      thought.reactions.push({ reactionBody, username });
      await thought.save();
      res.status(201).json(thought);
    } catch (error) {
      res.status(404).json(error);
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "Thought not found " });
      }
      thought.reactions = thought.reactions.filter(
        (reaction) => reaction._id.toString() !== reactionId
      );
      await thought.save();
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = thoughtController;
