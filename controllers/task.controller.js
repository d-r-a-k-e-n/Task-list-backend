const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Error on Server"});
  }
};

exports.createTask = async (req, res) => {
  try {
    const {title} = req.body;
    const {userId} = req.params;

    const newTask = new Task({title, user: userId});
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Error on Server"});
  }
};

exports.toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({message: "Task not found"});

    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Error on Server"});
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({message: "Task deleted"});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Error on Server"});
  }
};
