const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const taskController = require("../controllers/taskController");

router.get("/", auth, taskController.getTasks);
router.post("/", auth, role(["Admin", "Manager"]), taskController.createTask);
router.get("/:id", auth, taskController.getTaskById);
router.put("/:id", auth, taskController.updateTask);
router.delete("/:id", auth, role(["Admin"]), taskController.deleteTask);

module.exports = router;
