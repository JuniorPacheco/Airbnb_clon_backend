const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

//? Importación del modelo
const Users = require("../models/user.model");

const getAllUsers = async () => {
  const data = await Users.findAll({
    attributes: {
      exclude: ["password"],
    },
  });
  return data;
};

const getUserById = async (id) => {
  const data = await Users.findOne({
    where: {
      id: id,
    },
    attributes: {
      exclude: ["password"],
    },
  });
  return data;
};

const createUser = (data) => {
  const newUser = Users.create({
    ...data,
    id: uuid.v4(),
    password: hashPassword(data.password),
    roleId: "normal",
  });
  return newUser;
};

const editUser = async (userId, data, userRol) => {
  if (userRol === "5ee551ed-7bf4-44b0-aeb5-daaa824b9473") {
    const { id, password, ...newData } = data;
    const response = await Users.update(
      { ...newData, },
      { where: { id: userId }, }
    );
    return response;
  } else {
    const { id, password, roleId, ...newData } = data;
    const response = await Users.update(
      { ...newData },
      { where: { id: userId, } }
    );
    return response;
  }
};

const deleteUser = async (id) => {
  const data = await Users.destroy({
    where: {
      id: id,
    },
  });
  return data;
};

const getUserByEmail = async (email) => {
  const data = await Users.findOne({
    where: {
      email,
    },
  });
  return data;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
  getUserByEmail,
};
