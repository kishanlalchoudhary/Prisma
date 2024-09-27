const prisma = require("../db/prisma");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.json({
      status: 400,
      message: "Email already taken",
    });
  }

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return res.json({
    status: 200,
    data: newUser,
    message: "User created successfully",
  });
};

const fetchUsers = async (req, res) => {
  const users = await prisma.user.findMany();

  return res.json({
    status: 200,
    data: users,
    message: "Users fetched succesfully",
  });
};

const fetchUser = async (req, res) => {
  const userId = req.params.id;

  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });

  return res.json({
    status: 200,
    data: user,
    message: "Required user fetched succesfully",
  });
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });

  if (!findUser) {
    return res.json({
      status: 400,
      message: "User not found",
    });
  }

  await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return res.json({ status: 200, message: "User updated successfully" });
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  const findUser = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });

  if (!findUser) {
    return res.json({
      status: 400,
      message: "User not found",
    });
  }

  await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });

  return res.json({ status: 200, message: "User deleted successfully" });
};

module.exports = {
  createUser,
  fetchUsers,
  fetchUser,
  updateUser,
  deleteUser,
};
