const express = require("express");
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

const router = express.Router();

router.use("/api/users", userRoutes);

router.use("/api/thoughts", thoughtRoutes);

module.exports = router;
