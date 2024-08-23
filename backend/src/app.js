const express = require("express");
const ticketRoutes = require("./routes/ticketRoutes");
const authRoutes = require("./routes/authRoutes");
const collaboratorRoutes = require("./routes/collaboratorRoutes");
const userRoutes = require("./routes/userRoutes");
const authenticate = require("./middlewares/authMiddleware");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/tickets", authenticate, ticketRoutes);
app.use("/api/collaborators", authenticate, collaboratorRoutes);
app.use("/api/users", authenticate, userRoutes);

module.exports = app;
