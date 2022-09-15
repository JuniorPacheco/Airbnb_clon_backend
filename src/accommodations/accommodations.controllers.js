const Accommodations = require("../models/accommodations.model");
const Places = require("../models/places.model");
const Users = require("../models/user.model");

const uuid = require("uuid");
const Roles = require("../models/role.model");

const getAllAccommodations = async () => {
  const data = await Accommodations.findAll({
    include: [
      {
        model: Places,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: Users,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
    ],
  });
  return data;
};

const getAllMyAccommodations = async (userId) => {
  const data = await Accommodations.findAll({
    where: {
      hostId: userId,
    },
    include: [
      {
        model: Places,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: Users,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
    ],
  });
  return data;
};

const getAllAcommodationsByUserId = async (userId) => {
  const data = await Accommodations.findAll({
    where: {
      hostId: userId,
    },
    include: [
      {
        model: Places,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: Users,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
    ],
  });
  return data;
};

const getAccommodationById = async (id) => {
  const data = await Accommodations.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Places,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: Users,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt", "userId", "placeId", "hostId"],
    },
  });
  return data;
};

const createAccommodation = async (data, hostId, placeId) => {
  const newAccommodation = await Accommodations.create({
    ...data,
    id: uuid.v4(),
    hostId,
    placeId,
  });
  //?Retorna un arreglo con un número 0 erroneo y 1 si es valido
  return newAccommodation;
};

const editAccommodation = async (data, accommodationId, userId, roleId) => {
  const dataRoles = await Roles.findAll({ where: { name: ["admin", "host"] } });
  const rolesObeject = {};

  dataRoles.forEach((role) => {
    rolesObeject[role.dataValues.name] = role.dataValues.id;
  });

  if (roleId === rolesObeject["admin"]) {
    const { id, hostId, score, ...restOfData } = data;
    const response = await Accommodations.update(
      { ...restOfData },
      { where: { id: accommodationId } }
    );
    return response;
  }

  if (roleId === rolesObeject["host"]) {
    const { id, hostId, score, ...restOfData } = data;
    const response = await Accommodations.update(
      { ...restOfData },
      { where: { id: accommodationId, hostId: userId } }
    );
    return response;
  }

  //! Retorna un arreglo con un número el cual son las cantidad de elementos o rows
  //! que actualizo si es solo una fila la actualizada entonces retorna 1 y si no actualiza nada entonces retorna 0.
};

const removeAccommodation = async (accommodationId, roleId, userId) => {
  const dataRoles = await Roles.findAll({ where: { name: ["admin", "host"] } });
  const rolesObeject = {};

  dataRoles.forEach((role) => {
    rolesObeject[role.dataValues.name] = role.dataValues.id;
  });

  if (roleId === rolesObeject["admin"]) {
    const response = await Accommodations.destroy({
      where: { id: accommodationId },
    });
    return response;
  }

  if (roleId === rolesObeject["host"]) {
    const response = await Accommodations.destroy({
      where: { id: accommodationId, hostId: userId },
    });
    return response;
  }
};

module.exports = {
  getAllAccommodations,
  getAccommodationById,
  editAccommodation,
  removeAccommodation,
  createAccommodation,
  getAllMyAccommodations,
  getAllAcommodationsByUserId,
};
