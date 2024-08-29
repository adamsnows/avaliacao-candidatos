const request = require("supertest");
const app = require("../src/app");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

describe("Ticket Routes", () => {
  let authToken;
  let ticketId;
  let userId;

  beforeAll(async () => {
    await prisma.ticket.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash("testpassword", 10);
    const user = await prisma.user.create({
      data: {
        username: "testuser",
        email: "testuser@example.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    userId = user.id;

    const loginResponse = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "testpassword",
    });

    authToken = loginResponse.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Deve criar um novo ticket com sucesso", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        status: "PENDING",
        userId: userId,
        contact: false,
        contactType: "EMAIL",
        intention: "SUPPORT",
        vehicles: ["Carro"],
        reason: "REASON_1",
        additionalInfo: "Informações adicionais",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    ticketId = response.body.id;
    expect(response.body.status).toBe("PENDING");
  });

  it("Deve editar um ticket com sucesso", async () => {
    const response = await request(app)
      .put(`/api/tickets/${ticketId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        userId: userId,
        status: "RESOLVED",
        contact: true,
        contactType: "PHONE",
        intention: "SELLING",
        vehicles: ["Moto"],
        reason: "REASON_2",
        additionalInfo: "Informações atualizadas",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.status).toBe("RESOLVED");
    expect(response.body.contact).toBe(true);
    expect(response.body.contactType).toBe("PHONE");
    expect(response.body.intention).toBe("SELLING");
    expect(response.body.vehicles).toEqual(["Moto"]);
    expect(response.body.reason).toBe("REASON_2");
    expect(response.body.additionalInfo).toBe("Informações atualizadas");
  });

  it("Deve retornar erro ao editar um ticket com campos inválidos", async () => {
    const response = await request(app)
      .put(`/api/tickets/${ticketId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        userId: userId,
        status: "INVALID_STATUS",
        contact: "invalid",
        contactType: "UNKNOWN_TYPE",
        intention: "UNKNOWN_INTENTION",
        vehicles: "Moto",
        reason: "UNKNOWN_REASON",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("Deve excluir um ticket com sucesso", async () => {
    const response = await request(app)
      .delete(`/api/tickets/${ticketId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Ticket deleted successfully"
    );

    const deletedTicket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });
    expect(deletedTicket).toBeNull();
  });

  it("Deve retornar erro ao excluir um ticket que não existe", async () => {
    const nonExistentTicketId = 9999;
    const response = await request(app)
      .delete(`/api/tickets/${nonExistentTicketId}`)
      .set("Authorization", `Bearer ${authToken}`);

    console.log(response.body);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error", "Ticket not found");
  });
});
