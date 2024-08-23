const collaboratorService = require("../services/collaboratorService");

const getAllCollaborators = async (req, res) => {
  try {
    const collaborators = await collaboratorService.getAllCollaborators();
    res.json(collaborators);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCollaborator = async (req, res) => {
  try {
    const collaborator = await collaboratorService.getCollaboratorById(
      Number(req.params.id)
    );
    if (collaborator) {
      res.json(collaborator);
    } else {
      res.status(404).json({ error: "Collaborator not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCollaborator = async (req, res) => {
  try {
    const collaborator = await collaboratorService.createCollaborator(req.body);
    res.status(201).json(collaborator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCollaborator = async (req, res) => {
  try {
    const collaborator = await collaboratorService.updateCollaborator(
      Number(req.params.id),
      req.body
    );
    res.json(collaborator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCollaborator = async (req, res) => {
  try {
    await collaboratorService.deleteCollaborator(Number(req.params.id));
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCollaborators,
  getCollaborator,
  createCollaborator,
  updateCollaborator,
  deleteCollaborator,
};
