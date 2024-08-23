const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticate, getAllUsers);
router.get("/:id", authenticate, getUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

module.exports = router;
