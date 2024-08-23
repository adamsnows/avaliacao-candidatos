const request = require("supertest");
const app = require("../src/app");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

describe("Ticket Routes", () => {
  let authToken;

  beforeAll(async () => {
    await prisma.ticket.deleteMany();
    await prisma.user.deleteMany();
    await prisma.collaborator.deleteMany();

    const hashedPassword = await bcrypt.hash("testpassword", 10);
    await prisma.user.create({
      data: {
        username: "testuser",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    const loginResponse = await request(app).post("/api/auth/login").send({
      username: "testuser",
      password: "testpassword",
    });

    authToken = loginResponse.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Deve criar um novo ticket com sucesso", async () => {
    const collaborator = await prisma.collaborator.create({
      data: {
        name: "Test Collaborator",
        email: "testcollaborator@example.com",
        password: await bcrypt.hash("testpassword", 10),
        role: "ATTENDANT",
      },
    });

    const response = await request(app)
      .post("/api/tickets")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Problema no sistema",
        description: "Descrição do problema",
        status: "PENDING",
        userId: collaborator.id,
        collaboratorId: collaborator.id,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Problema no sistema");
  });

  it("Deve retornar erro ao criar ticket com campos inválidos", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "",
        description: "",
        status: "INVALID_STATUS",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
