const Accommodations = require("../models/accommodations.model");
const Reservations = require("../models/reservations.model");
const Roles = require("../models/role.model");

const testReservation = async () => {
  const reservations = await Reservations.findAll({
    include: {
      model: Accommodations,
      as: "Accommodations",
    },
    where: {
      id: "7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
    },
  });
  console.log(reservations);
};

const getObjectWithRoles = async () => {
  try {
    const dataRoles = await Roles.findAll({
      where: { name: ["admin", "host", "guest"] },
    });
    
    const roleObject = {};

    dataRoles.forEach((role) => {
      roleObject[role.dataValues.name] = role.dataValues.id;
    });
    return roleObject
  } catch (err) {
    return false
  }
};

module.exports = getObjectWithRoles
