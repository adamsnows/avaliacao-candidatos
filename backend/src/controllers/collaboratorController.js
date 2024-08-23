const collaboratorService = require("./collaboratorController");

exports.getAllCollaborators = async (req, res) => {
  try {
    const collaborators = await collaboratorService.getAllCollaborators();
    res.status(200).json(collaborators);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
