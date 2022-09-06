const { DataTypes } = require("sequelize");

const { db } = require("../utils/database");

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
    field: "accommodation_id",
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
    type: DataTypes.DECIMAL,
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
