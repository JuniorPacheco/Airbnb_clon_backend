const Reservations = require("../models/reservations.model");

const verifyFinished = async (req, res, next) => {
  const reservationId = req.params.id;

  const dataReservation = await Reservations.findOne({where: {
    id: reservationId
  }});

  req.isFinished = dataReservation.isFinished

  next();
};

module.exports = verifyFinished;
