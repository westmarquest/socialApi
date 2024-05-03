const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const thoughtRoutes = require("./routes/thoughtRoutes");

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/social_network_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
