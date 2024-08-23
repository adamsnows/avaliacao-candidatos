const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async () => {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (err) {
    throw new Error("Error fetching users");
  }
};

const getUserById = async (id) => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (err) {
    throw new Error("Error fetching user");
  }
};

const updateUser = async (id, data) => {
  try {
    return await prisma.user.update({ where: { id }, data });
  } catch (err) {
    throw new Error("Error updating user");
  }
};

const deleteUser = async (id) => {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch (err) {
    throw new Error("Error deleting user");
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
