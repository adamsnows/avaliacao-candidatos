const request = require("supertest");
const app = require("../src/app");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("Collaborator Routes", () => {
  beforeAll(async () => {
    await prisma.collaborator.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Deve listar todos os colaboradores com sucesso", async () => {
    await prisma.collaborator.create({
      data: {
        name: "Test Collaborator",
        email: "testcollaborator@example.com",
        password: "testpassword",
        role: "ATTENDANT",
      },
    });

    const response = await request(app).get("/api/collaborators");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
