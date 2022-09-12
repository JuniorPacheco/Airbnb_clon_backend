const Accommodations = require("../models/accommodations.model");
const Places = require("../models/places.model");
const Users = require("../models/user.model");

const uuid = require("uuid");

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
          exclude: ["createdAt", "updatedAt"],
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

const createAccommodation = async (data, hostId) => {
  const newAccommodation = await Accommodations.create({
    ...data,
    id: uuid.v4(),
    hostId,
  });
  //?Retorna un arreglo con un número 0 erroneo y 1 si es valido
  return newAccommodation;
};

const editAccommodation = async (data, accommodationId, userId) => {
  const { id, hostId, score, ...restOfData } = data;
  console.log(restOfData, accommodationId, userId);
  const response = await Accommodations.update(
    { ...restOfData },
    { where: { id: accommodationId, hostId: userId } }
  );

  //! Retorna un arreglo con un número el cual son las cantidad de elementos o rows 
  //! que actualizo si es solo una fila la actualizada entonces retorna 1 y si no actualiza nada entonces retorna 0.

  return response;
};

const removeAccommodation = async (accommodationId) => {
  const response = await Accommodations.destroy({
    where: { id: accommodationId },
  });
  return response;
};

module.exports = {
  getAllAccommodations,
  getAccommodationById,
  editAccommodation,
  removeAccommodation,
  createAccommodation,
};
