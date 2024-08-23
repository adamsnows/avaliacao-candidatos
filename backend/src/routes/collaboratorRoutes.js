const express = require("express");
const {
  getAllCollaborators,
} = require("../controllers/collaboratorController");

const router = express.Router();

router.get("/", getAllCollaborators);

module.exports = router;
