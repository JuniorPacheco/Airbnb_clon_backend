const Users = require("./user.model");
const UserImages = require("./userImages.model");
const Roles = require("./role.model");
const Reservations = require("./reservations.model");
const Places = require("./places.model");
const Accommodations = require("./accommodations.model");
const AccommodationImages = require("./accommodationImages.model");

const initModels = () => {
  //? Relaciones de los modelos

  //? 1aN
  Roles.hasMany(Users);
  Users.belongsTo(Roles);

  //? 1aN
  Users.hasMany(UserImages);
  UserImages.belongsTo(Users);

  //? NaN
  Users.belongsToMany(Accommodations, { through: Reservations });
  Accommodations.belongsToMany(Users, { through: Reservations });

  //? 1aN
  Accommodations.hasMany(AccommodationImages);
  AccommodationImages.belongsTo(Accommodations);

  //? 1aN
  Places.hasMany(Accommodations, {foreignKey: "place_id", sourceKey: "id"});
  Accommodations.belongsTo(Places, {foreignKey: "place_id", targetKey: "id"});

  //? 1aN
  Users.hasMany(Accommodations, {foreignKey: "host_id", sourceKey: "id"});
  Accommodations.belongsTo(Users, {foreignKey: "host_id", targetKey: "id"});
};

module.exports = initModels;
