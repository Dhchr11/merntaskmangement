require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const Task = require("./models/task.js");

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
        // Try connecting if not connected
        if (mongoose.connection.readyState === 0) {
            connectDB();
        }
        return res.status(503).json({
            error: "Database connecting... Please wait a few seconds and try again."
        });
    }
    next();
});

// Get all tasks
app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
    }
});

// Create new task in MongoDB
app.post("/api/tasks", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }
        const newtask = new Task({ title });
        await newtask.save();
        res.status(201).json(newtask);
    } catch (error) {
        res.status(500).json({ error: "Failed to create task", details: error.message });
    }
});

// Delete task from MongoDB
app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const deletetask = await Task.findByIdAndDelete(req.params.id);
        if (!deletetask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete task", error: err.message });
    }
});

// Update task in MongoDB
app.put("/api/tasks/:id", async (req, res) => {
    try {
        const updatetask = await Task.findByIdAndUpdate(
            req.params.id,
            { completed: req.body.completed },
            { new: true }
        );
        if (!updatetask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(updatetask);
    } catch (err) {
        res.status(500).json({ message: "Failed to update task", error: err.message });
    }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
