const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  } catch (err) {
    throw new Error("Error fetching users");
  }
};

module.exports = {
  getAllUsers,
};
