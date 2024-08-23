const { PrismaClient } = require("@prisma/client");
const request = require("supertest");
const app = require("../src/app");
const prisma = new PrismaClient();

describe("Ticket Routes", () => {
  beforeAll(async () => {
    await prisma.ticket.deleteMany();
    await prisma.user.deleteMany();
    await prisma.collaborator.deleteMany();
  });

  afterEach(async () => {
    await prisma.ticket.deleteMany();
    await prisma.user.deleteMany();
    await prisma.collaborator.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Deve criar um novo ticket com sucesso", async () => {
    const newUser = await prisma.user.create({
      data: {
        username: "testuser",
        password: "testpassword",
        role: "ADMIN",
      },
    });

    const newCollaborator = await prisma.collaborator.create({
      data: {
        name: "Test Collaborator",
        email: "testcollaborator@example.com",
        password: "testpassword",
        role: "ATTENDANT",
      },
    });

    const response = await request(app).post("/tickets").send({
      title: "Problema no sistema",
      description: "Descrição do problema",
      collaboratorId: newCollaborator.id,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Problema no sistema");
  });

  // Outros testes...
});
