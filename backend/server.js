require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Auto-reconnecting MongoDB function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.log("MongoDB connection error (retrying in 3s)...", err.message);
        setTimeout(connectDB, 3000);
    }
};
connectDB();

// Middleware to check database connection status
app.use((req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        if (mongoose.connection.readyState === 0) {
            connectDB();
        }
        return res.status(503).json({
            error: "Database connecting... Please wait a few seconds and try again."
        });
    }
    next();
});

// Routes
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
