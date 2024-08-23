const express = require("express");
const {
  createTicket,
  updateTicket,
  deleteTicket,
  getTicket,
  getAllTickets,
} = require("../controllers/ticketController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticate, createTicket);
router.put("/:id", authenticate, updateTicket);
router.delete("/:id", authenticate, deleteTicket);
router.get("/:id", authenticate, getTicket);
router.get("/", authenticate, getAllTickets);

module.exports = router;
