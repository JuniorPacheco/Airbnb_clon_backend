const { DataTypes } = require("sequelize");

const { db } = require("../utils/database");

const AccommodationImages = db.define("accommodation_images", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  accommodationId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: "accommodation_id",
  },
  url: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
});

module.exports = AccommodationImages;
