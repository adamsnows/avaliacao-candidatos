const request = require("supertest");
const app = require("../src/app");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("Ticket Routes", () => {
  beforeAll(async () => {
    await prisma.ticket.deleteMany();
    await prisma.user.deleteMany();
    await prisma.collaborator.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Deve criar um novo ticket com sucesso", async () => {
    const user = await prisma.user.create({
      data: {
        username: "testuser",
        password: "testpassword",
        role: "ADMIN",
      },
    });

    const collaborator = await prisma.collaborator.create({
      data: {
        name: "Test Collaborator",
        email: "testcollaborator@example.com",
        password: "testpassword",
        role: "ATTENDANT",
      },
    });

    const response = await request(app).post("/api/tickets").send({
      title: "Problema no sistema",
      description: "Descrição do problema",
      status: "PENDING",
      userId: user.id,
      collaboratorId: collaborator.id,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Problema no sistema");
  });

  it("Deve retornar erro ao criar ticket com campos inválidos", async () => {
    const response = await request(app).post("/api/tickets").send({
      title: "",
      description: "",
      status: "INVALID_STATUS",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
