const Users = require("./user.model");
const Roles = require("./role.model");
const Reservations = require("./reservations.model");
const Places = require("./places.model");
const Accommodations = require("./accommodations.model");

const initModels = () => {
  //? Relaciones de los modelos

  //? 1aN
  Roles.hasMany(Users);
  Users.belongsTo(Roles);

  //? NaN
  // Users.belongsToMany(Accommodations, { through: Reservations, foreignKey: "user_id"});
  // Accommodations.belongsToMany(Users, { through: Reservations, foreignKey: "accommodation_id"});

  //? 1aN
  Users.hasMany(Reservations)
  Reservations.belongsTo(Users)

  //? 1aN
  Accommodations.hasMany(Reservations)
  Reservations.belongsTo(Accommodations)

  //? 1aN
  Places.hasMany(Accommodations, {foreignKey: "place_id", sourceKey: "id"});
  Accommodations.belongsTo(Places, {foreignKey: "place_id", targetKey: "id"});

  //? 1aN
  Users.hasMany(Accommodations, {foreignKey: "host_id", sourceKey: "id"});
  Accommodations.belongsTo(Users, {foreignKey: "host_id", targetKey: "id"});
};

module.exports = initModels;
