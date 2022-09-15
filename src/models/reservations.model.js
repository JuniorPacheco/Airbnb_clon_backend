const { DataTypes, Deferrable } = require("sequelize");

const { db } = require("../utils/database");

const Users = require("./user.model");
const Accommodations = require("./accommodations.model");

const Reservations = db.define("reservations", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
  },
  userId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: "user_id",
    references: {
      model: Users,
      key: "id",
    },
  },
  arrival: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  departure: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  accommodationId: {
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: Accommodations,
      key: "id",
    },
    field: "accommodation_id"
  },
  adults: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  kids: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  babies: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  pets: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  score: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  isFinished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: "is_finished",
  },
  isCanceled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: "is_canceled",
  },
});

module.exports = Reservations;
