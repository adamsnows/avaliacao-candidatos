// scripts/cleanDatabase.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const clearDatabase = async () => {
  try {
    await prisma.ticket.deleteMany();
    await prisma.user.deleteMany();
    await prisma.collaborator.deleteMany();
    console.log("Banco de dados limpo com sucesso!");
  } catch (error) {
    console.error("Erro ao limpar o banco de dados:", error);
  } finally {
    await prisma.$disconnect();
  }
};

clearDatabase();
