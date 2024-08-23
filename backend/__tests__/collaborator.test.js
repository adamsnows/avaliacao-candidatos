const request = require("supertest");
const app = require("../src/app");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

describe("Collaborator Routes", () => {
  let authToken;
  let collaboratorId;

  beforeAll(async () => {
    await prisma.collaborator.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash("testpassword", 10);
    const user = await prisma.user.create({
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

  it("Deve listar todos os colaboradores com sucesso", async () => {
    await prisma.collaborator.create({
      data: {
        name: "Test Collaborator",
        email: "testcollaborator@example.com",
        password: await bcrypt.hash("testpassword", 10),
        role: "ATTENDANT",
      },
    });

    const response = await request(app)
      .get("/api/collaborators")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Deve criar um novo colaborador com sucesso", async () => {
    const response = await request(app)
      .post("/api/collaborators")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "New Collaborator",
        email: "newcollaborator@example.com",
        password: "newpassword",
        role: "ATTENDANT",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("New Collaborator");

    collaboratorId = response.body.id;
  });

  it("Deve atualizar um colaborador com sucesso", async () => {
    const response = await request(app)
      .put(`/api/collaborators/${collaboratorId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Updated Collaborator",
        email: "updatedcollaborator@example.com",
        password: "updatedpassword",
        role: "ATTENDANT",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Updated Collaborator");
  });

  it("Deve excluir um colaborador com sucesso", async () => {
    const response = await request(app)
      .delete(`/api/collaborators/${collaboratorId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.statusCode).toBe(204);
  });
});
