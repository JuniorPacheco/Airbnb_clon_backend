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
  Users.hasOne(Roles);
  Roles.belongsToMany(Users);

  //? 1aN
  Users.hasMany(UserImages);
  UserImages.belongsTo(Users);

  //? NaN
  Users.belongsToMany(Accommodations, { through: Reservations });
  Accommodations.belongsToMany(Accommodations, { through: Reservations });

  //? 1aN
  Accommodations.hasMany(AccommodationImages);
  AccommodationImages.belongsTo(Accommodations);

  //? 1aN
  Places.hasMany(Accommodations);
  Accommodations.belongsTo(Places);
};

module.exports = initModels;
