// src/services/collaboratorService.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllCollaborators = async () => {
  return await prisma.collaborator.findMany();
};

module.exports = {
  getAllCollaborators,
};
