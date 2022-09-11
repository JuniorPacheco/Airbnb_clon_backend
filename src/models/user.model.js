const { DataTypes } = require("sequelize");

const { db } = require("../utils/database");

const Users = db.define("users", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  gender: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  dni: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  birthdayDate: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: "birthday_date",
  },
  roleId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: "role_id",
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "active", //active, non-active, deleted, suspended
  },
  verified: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: "updated_at",
  },
});

module.exports = Users;
