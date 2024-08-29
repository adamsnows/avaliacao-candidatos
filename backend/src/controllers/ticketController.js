const ticketService = require("../services/ticketService");

exports.createTicket = async (req, res) => {
  try {
    const ticket = await ticketService.createTicket(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const ticket = await ticketService.updateTicket(req.params.id, req.body);
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const result = await ticketService.deleteTicket(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.getTicket = async (req, res) => {
  try {
    const ticket = await ticketService.getTicket(req.params.id);
    res.json(ticket);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketService.getAllTickets();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};
