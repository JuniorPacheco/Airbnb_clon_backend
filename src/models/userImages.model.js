const { DataTypes } = require("sequelize");

const { db } = require("../utils/database");

const UserImages = db.define("user_images", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
  },
  url: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
        isUrl: true
    }
  },
  userId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: 'user_id'
  }
});

module.exports = UserImages;
