const Reservations = require("../models/reservations.model");

const verifyCancelation = async (req, res, next) => {
  const reservationId = req.params.id;

  const dataReservation = await Reservations.findOne({where: {
    id: reservationId
  }});

  req.isCanceled = dataReservation.isCanceled

  next();
};

module.exports = verifyCancelation;
