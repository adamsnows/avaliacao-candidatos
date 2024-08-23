const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const validateTicketData = (data) => {
  const Joi = require("joi");

  const ticketSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    collaboratorId: Joi.number().integer().required(),
  });

  const { error, value } = ticketSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
};

const createTicket = async (ticketData) => {
  const validatedData = validateTicketData(ticketData);

  const ticket = await prisma.ticket.create({
    data: {
      title: validatedData.title,
      description: validatedData.description,
      collaborator: {
        connect: { id: validatedData.collaboratorId },
      },
    },
  });

  return ticket;
};

const updateTicket = async (id, ticketData) => {
  const validatedData = validateTicketData(ticketData);

  const updatedTicket = await prisma.ticket.update({
    where: { id: Number(id) },
    data: {
      title: validatedData.title,
      description: validatedData.description,
      collaborator: {
        connect: { id: validatedData.collaboratorId },
      },
    },
  });

  return updatedTicket;
};

const deleteTicket = async (id) => {
  await prisma.ticket.delete({
    where: { id: Number(id) },
  });

  return { message: "Ticket deleted successfully" };
};

const getTicket = async (id) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: Number(id) },
    include: { collaborator: true },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  return ticket;
};

const getAllTickets = async () => {
  return await prisma.ticket.findMany({
    include: { collaborator: true },
  });
};

module.exports = {
  createTicket,
  updateTicket,
  deleteTicket,
  getTicket,
  getAllTickets,
};
