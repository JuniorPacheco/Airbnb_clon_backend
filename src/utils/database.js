const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "199710011973jF",
  database: "skeleton",
  port: 5432,
});

module.exports = {
  db,
};
