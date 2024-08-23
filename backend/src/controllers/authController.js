const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await authService.registerUser(username, password, role);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { token, role } = await authService.loginUser(username, password);
    res.json({ token, role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
