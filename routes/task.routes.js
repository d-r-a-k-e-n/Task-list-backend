const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

router.get("/", taskController.getTasks);
router.post("/:userId", taskController.createTask);
router.put("/:id", taskController.toggleTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
