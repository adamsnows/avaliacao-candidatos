const express = require("express");
const bodyParser = require("body-parser");
const ticketRoutes = require("./src/routes/ticketRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api/tickets", ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
