const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "ticket_managementz";

const registerUser = async (username, password, role, email) => {
  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) {
    throw new Error("Email already taken");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email,
      role,
    },
  });

  return user;
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      username: true,
      password: true,
      role: true,
      email: true,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, {
    expiresIn: "7d",
  });

  return {
    token,
    role: user.role,
    username: user.username,
    email: user.email,
  };
};

const registerCollaborator = async (name, email, password, role) => {
  const existingCollaborator = await prisma.collaborator.findUnique({
    where: { email },
  });
  if (existingCollaborator) {
    throw new Error("Email already taken");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const collaborator = await prisma.collaborator.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return collaborator;
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = {
  registerUser,
  loginUser,
  registerCollaborator,
  verifyToken,
};
