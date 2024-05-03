// userController.js

const { User } = require("../models");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId)
        .populate("thoughts")
        .populate("friends");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Optionally, remove user's associated thoughts
      // await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.friends.includes(friendId)) {
        return res.status(400).json({ message: "User is already a friend" });
      }
      user.friends.push(friendId);
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!user.friends.includes(friendId)) {
        return res.status(400).json({ message: "User is not a friend" });
      }
      user.friends = user.friends.filter(
        (friend) => friend.toString() !== friendId
      );
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
