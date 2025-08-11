const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const userController = require("../controllers/userController");

router.get("/", auth, role(["Admin"]), userController.getAllUsers);
router.get("/:id", auth, role(["Admin"]), userController.getUserById);
router.put("/:id/role", auth, role(["Admin"]), userController.updateUserRole);

module.exports = router;
