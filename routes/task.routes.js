const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { auth } = require("../middleware/auth");

router.use(auth);

router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.toggleTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
