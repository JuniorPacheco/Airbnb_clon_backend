const uuid = require("uuid");
const Accommodations = require("../models/accommodations.model");

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

const getReservationById = async (ReservationId, userId, dataRoles, roleId) => {
  if (roleId === dataRoles["admin"]) {
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

const createReservation = async (dataReservation, userId, accommodationId) => {
  const newReservation = await Reservations.create({
    ...dataReservation,
    id: uuid.v4(),
    userId,
    accommodationId,
    score: 0,
  });

  return newReservation;
};

const editReservation = async (dataReservation, userId, reservationId) => {
  const { score } = dataReservation;
  const response = await Reservations.update(
    { score },
    {
      where: { userId, isFinished: true, isCanceled: false, id: reservationId },
    }
  );
  console.log(response);
  return response;
};

const deleteReservation = async (reservationId, userId) => {
  const response = await Reservations.findOne({
    where: {id: reservationId},
    include: {
      model: Accommodations,
      as: "accommodation"
    }
  })

  if(!response) {
    return [0]
  }

  if(response.accommodation?.hostId === userId) {
    const data = await Reservations.update(
      { isCanceled: true },
      { where: { id: reservationId } }
    );
    return data;
  }

  const data = await Reservations.update(
    { isCanceled: true },
    { where: { id: reservationId, userId } }
  );
  return data;
  //? retorna un arreglo con la cantidad de elimentos que elimino, en caso de no eliminar algun dato retorna cero
};

module.exports = {
  getAllReservations,
  getAllMyReservations,
  getReservationById,
  editReservation,
  deleteReservation,
  createReservation,
};
