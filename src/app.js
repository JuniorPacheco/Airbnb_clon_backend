//* Dependencias
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const dotenv = require("dotenv");

dotenv.config({ path: './.env' });

//*Archivos de rutas
const userRouter = require("./users/users.router").router;
const authRouter = require("./auth/auth.router").router;
const accommodationsRouter = require("./accommodations/accommodations.router").router;
const reservationsRouter = require("./reservations/reservations.router").router;
const placesRouter = require("./places/places.router").router;

const initModels = require("./models/initModels");
const { generateData } = require("./utils/initDataDB");
const swaggerDoc = require("./swagger.json")

//* Configuraciones iniciales
const { db } = require("./utils/database");
const app = express();

initModels();

db.authenticate()
  .then(() => console.log("DataBase Authenticated"))
  .catch((err) => console.log(err));

db.sync({ force: false })
  .then(() => {
    generateData();
  })
  .catch((err) => console.log(err));

//? Esta configuracion es para habilitar el req.body
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({ message: "All ok!" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/accommodations", accommodationsRouter);
app.use("/api/v1/reservations", reservationsRouter);
app.use("/api/v1/places", placesRouter);

app.use("/api/v1/doc", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.listen(process.env.PORT, () => {
  console.log("Server started !!!");
});

module.exports = app