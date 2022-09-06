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
    type: DataTypes.STRING,
    validate: {
      min: 10,
    },
  },
  dni: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  birthday_date: {
    allowNull: false,
    type: DataTypes.DATEONLY,
  },
  role: {
    allowNull: false,
    type: DataTypes.UUID,
  },
  state: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "active",
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
