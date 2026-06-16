require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./src/config/db");
const productRoutes = require("./src/routes/productRoutes");
const authRoutes = require("./src/routes/authRoutes");
const errorHandler = require("./src/middleware/errorHandler");

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// Security & Utility Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// NEW: Serve frontend static files
app.use(express.static("public"));

// Routes
app.use("/api/auth", authRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
