const request = require("supertest");
const app = require("../src/app");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

describe("Auth Routes", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Deve registrar um novo usuário attendant com sucesso", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "testusers@example.com",
      password: "testpassword",
      role: "ATTENDANT",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.username).toBe("testuser");
  });

  it("Deve fazer login e retornar um token", async () => {
    await prisma.user.create({
      data: {
        username: "testloginuser",
        email: "testloginusers@example.com",
        password: await bcrypt.hash("testpassword", 10),
        role: "ADMIN",
      },
    });

    const response = await request(app).post("/api/auth/login").send({
      email: "testloginusers@example.com",
      password: "testpassword",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Deve registrar um novo usuário admin com sucesso", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "adminuser",
      email: "adminuser@example.com",
      password: "testpassword",
      role: "ADMIN",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.username).toBe("adminuser");
  });
});
