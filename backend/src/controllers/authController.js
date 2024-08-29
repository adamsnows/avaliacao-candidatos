const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const { username, password, role, email } = req.body;
    const user = await authService.registerUser(
      username,
      password,
      role,
      email
    );
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { id, token, role, username } = await authService.loginUser(
      email,
      password
    );
    res.json({ id, username, email, token, role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.registerCollaborator = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const collaborator = await authService.registerCollaborator(
      name,
      email,
      password,
      role
    );
    res
      .status(201)
      .json({ message: "Collaborator registered successfully", collaborator });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
