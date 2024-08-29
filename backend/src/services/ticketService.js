const { PrismaClient } = require("@prisma/client");
const Joi = require("joi");

const prisma = new PrismaClient();

const validateTicketData = (data) => {
  const ticketSchema = Joi.object({
    status: Joi.string()
      .valid("PENDING", "IN_PROGRESS", "RESOLVED", "CLOSED")
      .required(),
    userId: Joi.number().required(),
    contact: Joi.boolean().optional(),
    contactType: Joi.string().optional(),
    intention: Joi.string()
      .valid("OPERATIONAL", "RELATIONSHIP", "SUPPORT", "SELLING")
      .required(),
    vehicles: Joi.array().items(Joi.string()).optional(),
    reason: Joi.string().valid("REASON_1", "REASON_2", "REASON_3").required(),
    additionalInfo: Joi.string().optional(),
  });

  const { error, value } = ticketSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
};

const createTicket = async (ticketData) => {
  const validatedData = validateTicketData(ticketData);

  try {
    const ticket = await prisma.ticket.create({
      data: {
        status: validatedData.status,
        user: { connect: { id: validatedData.userId } },
        contact: validatedData.contact,
        contactType: validatedData.contactType,
        intention: validatedData.intention,
        vehicles: validatedData.vehicles,
        reason: validatedData.reason,
        additionalInfo: validatedData.additionalInfo,
      },
    });

    return ticket;
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("User not found");
    }
    throw error;
  }
};

const updateTicket = async (id, ticketData) => {
  const validatedData = validateTicketData(ticketData);

  try {
    const updatedTicket = await prisma.ticket.update({
      where: { id: Number(id) },
      data: {
        status: validatedData.status,
        user: { connect: { id: validatedData.userId } },
        contact: validatedData.contact,
        contactType: validatedData.contactType,
        intention: validatedData.intention,
        vehicles: validatedData.vehicles,
        reason: validatedData.reason,
        additionalInfo: validatedData.additionalInfo,
      },
    });

    return updatedTicket;
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("Ticket not found");
    }
    throw error;
  }
};

const deleteTicket = async (id) => {
  try {
    await prisma.ticket.delete({
      where: { id: Number(id) },
    });

    return { message: "Ticket deleted successfully" };
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("Ticket not found");
    }
    throw error;
  }
};

const getTicket = async (id) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: Number(id) },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  return ticket;
};

const getAllTickets = async () => {
  return await prisma.ticket.findMany();
};

module.exports = {
  createTicket,
  updateTicket,
  deleteTicket,
  getTicket,
  getAllTickets,
};
