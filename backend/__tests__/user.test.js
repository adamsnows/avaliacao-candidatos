const request = require("supertest");
const app = require("../src/app");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

describe("User Routes", () => {
  let authToken;

  beforeAll(async () => {
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash("testpassword", 10);
    const user = await prisma.user.create({
      data: {
        username: "adminuser",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    const loginResponse = await request(app).post("/api/auth/login").send({
      username: "adminuser",
      password: "testpassword",
    });

    authToken = loginResponse.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Deve listar todos os usuários com sucesso", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
