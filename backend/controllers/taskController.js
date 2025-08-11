const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const data = { ...req.body, createdBy: req.user._id };
    const task = await Task.create(data);
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    if (req.user.role === "Admin" || req.user.role === "Manager") {
      const tasks = await Task.find().populate(
        "assignedTo createdBy",
        "name email role"
      );
      return res.json(tasks);
    }
    const tasks = await Task.find({ assignedTo: req.user._id }).populate(
      "createdBy assignedTo",
      "name email role"
    );
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo createdBy",
      "name email role"
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role === "User") {
      if (
        !task.assignedTo ||
        String(task.assignedTo) !== String(req.user._id)
      ) {
        return res.status(403).json({ message: "Forbidden" });
      }
      if (req.body.title || req.body.description || req.body.assignedTo) {
        return res
          .status(403)
          .json({ message: "Users can only change status" });
      }
    }

    Object.assign(task, req.body);
    await task.save();
    const updated = await Task.findById(task._id).populate(
      "assignedTo createdBy",
      "name email role"
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
