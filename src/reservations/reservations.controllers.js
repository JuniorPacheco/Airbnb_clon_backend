const uuid = require("uuid");
const Reservations = require("../models/reservations.model");

const getAllReservations = async () => {
  const data = Reservations.findAll();
  return data;
};

const getAllMyReservations = async (userId) => {
  const data = Reservations.findAll({
    where: {
      userId,
    },
  });
  return data;
};

const getReservationById = async (ReservationId, userId) => {
  const dataRoles = await Roles.findAll({
    where: { name: ["admin", "host", "guest"] },
  });
  const rolesObject = {};

  dataRoles.forEach((role) => {
    rolesObject[role.dataValues.name] = role.dataValues.id;
  });

  //! Preguntarle al profesor porque no funciona esto cuando lo testeo por aparte y si funciona

  if (roleId === rolesObject["admin"]) {
    const data = Reservations.findOne({
      where: {
        id: ReservationId,
      },
    });
    return data;
  }
  const data = Reservations.findOne({
    where: {
      id: ReservationId,
      userId,
    },
  });
  return data;
};

const createReservation = async (dataReservation, userId) => {
  const newReservation = await Reservations.create({
    ...dataReservation,
    id: uuid.v4(),
    userId,
  });
  return newReservation;
};

const editReservation = async (dataReservation, userId, reservationId) => {
  const { score } = dataReservation;
  const response = await Reservations.update(
    { score },
    { where: { userId, isFinished: true, id: reservationId } }
  );
  return response;
};

const deleteReservation = async (reservationId, userId) => {
  const data = await Reservations.update(
    { isCanceled: true },
    { where: { id: reservationId, userId } }
  );
  return data;
};

module.exports = {
  getAllReservations,
  getAllMyReservations,
  getReservationById,
  editReservation,
  deleteReservation,
  createReservation,
};
