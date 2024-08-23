const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  try {
    const newUser = await prisma.user.create({
      data: {
        username: "testuser",
        password: "testpassword",
        role: "ADMIN",
      },
    });
    console.log("Usuário criado:", newUser);

    const newCollaborator = await prisma.collaborator.create({
      data: {
        name: "Test Collaborator",
        email: "testcollaborator@example.com",
        password: "testpassword",
        role: "ATTENDANT",
      },
    });
    console.log("Colaborador criado:", newCollaborator);

    const newTicket = await prisma.ticket.create({
      data: {
        title: "Problema no sistema",
        description: "Descrição do problema",
        status: "PENDING",
        userId: newUser.id,
        collaboratorId: newCollaborator.id,
      },
    });
    console.log("Ticket criado:", newTicket);
  } catch (error) {
    console.error("Erro:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

run();
