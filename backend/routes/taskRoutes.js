const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET /api/tasks - Fetch all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
    }
});

// POST /api/tasks - Create new task
router.post("/", async (req, res) => {
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

// PUT /api/tasks/:id - Update task completion status
router.put("/:id", async (req, res) => {
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

// DELETE /api/tasks/:id - Delete task
router.delete("/:id", async (req, res) => {
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

module.exports = router;
