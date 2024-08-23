const express = require("express");
const bodyParser = require("body-parser");
const ticketRoutes = require("./src/routes/ticketRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api/tickets", ticketRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
