const { DataTypes } = require("sequelize");

const { db } = require("../utils/database");

const Accommodations = db.define("accommodations", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  guests: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  rooms: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  beds: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  bathrooms: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  hostId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: "host_id",
  },
  score: {
    allowNull: false,
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  placeId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: "place_id",
  },
  commision: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
});

module.exports = Accommodations;
