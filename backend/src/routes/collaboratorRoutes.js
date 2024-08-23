const express = require("express");
const {
  getAllCollaborators,
  getCollaborator,
  createCollaborator,
  updateCollaborator,
  deleteCollaborator,
} = require("../controllers/collaboratorController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticate, getAllCollaborators);
router.get("/:id", authenticate, getCollaborator);
router.post("/", authenticate, createCollaborator);
router.put("/:id", authenticate, updateCollaborator);
router.delete("/:id", authenticate, deleteCollaborator);

module.exports = router;
