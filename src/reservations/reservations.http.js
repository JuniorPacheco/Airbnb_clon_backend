const reservationsControllers = require("./reservations.controllers");

const getAll = (req, res) => {
  reservationsControllers
    .getAllReservations()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getAllMine = (req, res) => {
  const userId = req.user.id;
  reservationsControllers
    .getAllMyReservations(userId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getById = (req, res) => {
  const reservationId = req.params.id;
  const userId = req.user.id;
  const roleId = req.user.roleId;
  const dataRoles = req.dataRoles;

  reservationsControllers
    .getReservationById(reservationId, userId, dataRoles, roleId)
    .then((response) => {
      if(response) {
        res.status(200).json(response);
      }else {
        res.status(400).json({message: "Invalid Id"});
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const create = (req, res) => {
  const dataReservation = req.body;
  const userId = req.user.id;
  const accommodationId = req.params.id;

  if (!dataReservation) {
    return res.status(400).json({ message: "Missing data" });
  }

  if (
    !dataReservation.arrival ||
    !dataReservation.departure ||
    !dataReservation.adults
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        arrival: "string example: 2022-09-12 11:17:50.213 -0500",
        departure: "string example: 2022-09-12 11:17:50.213 -0500",
        adults: "number int",
        kids: "number int || it's not mandatory",
        babies: "number int || it's not mandatory",
        pets: "number int || it's not mandatory",
      },
    });
  }

  reservationsControllers
    .createReservation(dataReservation, userId, accommodationId)
    .then((response) => {
      res.status(201).json({
        message: `Reservation created succesfully with id: ${response.id}`,
        accommodation: response,
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const edit = (req, res) => {
  const dataReservation = req.body;
  const userId = req.user.id;
  const reservationId = req.params.id;
  const isCanceled = req.isCanceled;
  const isFinished = req.isFinished;

  if (!Object.keys(dataReservation).length) {
    return res.status(400).json({
      message: "Field must be completed",
      fields: {
        score: "Type: number, you need to have finished the reservation",
      },
    });
  }

  if (dataReservation.score === undefined) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        score: "Type: number, you need to have finished the reservation",
      },
    });
  }


  if(isCanceled){
    return res.status(400).json({
      message: "This reservation was canceled you cannot give a score"
    });
  }

  if(!isFinished){
    return res.status(400).json({
      message: "This reservation has not been completed, you cannot rate it"
    });
  }

  reservationsControllers
    .editReservation(dataReservation, userId, reservationId)
    .then((response) => {
      if (response[0]) {
        return res.status(200).json({
          message: `Reservation score edited succesfully with id`,
        });
      } else {
        return res.status(404).json({ message: "Invalid reservation ID" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

const remove = (req, res) => {
  const reservationId = req.params.id;
  const userId = req.user.id;
  const isCanceled = req.isCanceled;
  const isFinished = req.isFinished;

  if(isCanceled) {
    return res.status(400).json({
      message: "This reservation is already canceled",
    });
  }

  if(isFinished) {
    return res.status(400).json({
      message: "This reservation is finished, you cannot cancel it",
    });
  }

  reservationsControllers
    .deleteReservation(reservationId, userId)
    .then((response) => {
      if (response[0]) {
        res.status(204).json();
      } else {
        res.status(400).json({ message: `Invalid Id` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  getAll,
  getAllMine,
  getById,
  create,
  edit,
  remove,
};
