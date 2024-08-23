const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const validateRole = (role) => {
  const validRoles = ["ADMIN", "ATTENDANT"];
  if (role && !validRoles.includes(role)) {
    throw new Error("Invalid role");
  }
};

const getAllCollaborators = async () => {
  return await prisma.collaborator.findMany();
};

const getCollaboratorById = async (id) => {
  const collaborator = await prisma.collaborator.findUnique({ where: { id } });
  if (!collaborator) {
    throw new Error("Collaborator not found");
  }
  return collaborator;
};

const createCollaborator = async (data) => {
  const { name, email, password, role } = data;

  validateRole(role);

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.collaborator.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });
};

const updateCollaborator = async (id, data) => {
  const { name, email, password, role } = data;

  validateRole(role);

  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  return await prisma.collaborator.update({
    where: { id },
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });
};

const deleteCollaborator = async (id) => {
  const collaborator = await getCollaboratorById(id);
  if (!collaborator) {
    throw new Error("Collaborator not found");
  }

  return await prisma.collaborator.delete({ where: { id } });
};

module.exports = {
  getAllCollaborators,
  getCollaboratorById,
  createCollaborator,
  updateCollaborator,
  deleteCollaborator,
};
