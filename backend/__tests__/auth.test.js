const request = require("supertest");
const app = require("../src/app");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

describe("Auth Routes", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
    await prisma.collaborator.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Deve registrar um novo usuário com sucesso", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "testuser",
      password: "testpassword",
      role: "ADMIN",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.username).toBe("testuser");
  });

  it("Deve fazer login e retornar um token", async () => {
    await prisma.user.create({
      data: {
        username: "testloginuser",
        password: await bcrypt.hash("testpassword", 10),
        role: "ADMIN",
      },
    });

    const response = await request(app).post("/api/auth/login").send({
      username: "testloginuser",
      password: "testpassword",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Deve registrar um novo colaborador com sucesso", async () => {
    const user = await prisma.user.create({
      data: {
        username: "adminuser",
        password: await bcrypt.hash("adminpassword", 10),
        role: "ADMIN",
      },
    });

    const loginResponse = await request(app).post("/api/auth/login").send({
      username: "adminuser",
      password: "adminpassword",
    });

    const authToken = loginResponse.body.token;

    const response = await request(app)
      .post("/api/auth/register-collaborator")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Test Collaborator",
        email: "testcollaborator@exampless.com",
        password: "collaboratorpassword",
        role: "ATTENDANT",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.collaborator).toHaveProperty("id");
    expect(response.body.collaborator.name).toBe("Test Collaborator");
  });
});
