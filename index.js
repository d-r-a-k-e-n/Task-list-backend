require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("./config/db.js");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error on Server" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error on Server" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
