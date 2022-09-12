const accommodationControllers = require("./accommodations.controllers");

const getAll = (req, res) => {
  accommodationControllers
    .getAllAccommodations()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getById = (req, res) => {
  const accommodationId = req.params.id;
  accommodationControllers
    .getAccommodationById(accommodationId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const create = (req, res) => {
  const data = req.body;
  const hostId = req.user.id
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.title || 
    !data.description ||
    !data.guests ||
    !data.rooms ||
    !data.beds ||
    !data.bathrooms ||
    !data.price ||
    !data.hostId ||
    !data.placeId ||
    !data.commision
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        title: "string",
        description: "string",
        guests: "number int",
        rooms: "number int",
        beds: "number int",
        bathrooms: "number",
        price: "number",
        hostId: "uuid",
        placeId: "uuid",
        commision: "number",
      },
    });
  } else {
    accommodationControllers
      .createAccommodation(data, hostId)
      .then((response) => {
        res.status(201).json({
          message: `Accommodation created succesfully with id: ${response.id}`,
          accommodatiion: response,
        });
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  }
};

const edit = (req, res) => {
  const data = req.body;
  const accommodationId = req.params.id;
  const userId = req.user.id;

  if (!Object.keys(data).length) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        title: "string",
        description: "string",
        guests: "number int",
        rooms: "number int",
        beds: "number int",
        bathrooms: "number",
        price: "number",
        hostId: "uuid",
        placeId: "uuid",
        commision: "number",
      },
    });
  } else {
    accommodationControllers
      .editAccommodation(data, accommodationId, userId)
      .then((response) => {
        if (response[0]) {
          return res.status(200).json({
            message: `Accommodation edited succesfully with id ${accommodationId}`,
          });
        } else {
          return res.status(404).json({ message: "Invalid id" });
        }
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  }
};

const remove = (req, res) => {
  const accommodationId = req.params.id;
  accommodationControllers
    .removeAccommodation(accommodationId)
    .then((response) => {
      if (response) {
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
  getById,
  create,
  edit,
  remove,
};
