// src/controllers/collaboratorController.js
const collaboratorService = require("../services/collaboratorService");

exports.getAllCollaborators = async (req, res) => {
  try {
    const collaborators = await collaboratorService.getAllCollaborators();
    res.status(200).json(collaborators);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
