//* Dependencias
const express = require("express");
const passport = require("passport");
require("./middleware/auth.middleware")(passport);

//*Archivos de rutas
const userRouter = require("./users/users.router").router;
const authRouter = require("./auth/auth.router").router;

const { db } = require("./utils/database")

//* Configuraciones iniciales
const app = express();

db.authenticate()
  .then(() => console.log('DataBase Authenticated'))
  .catch((err) => console.log(err))

db.sync()
  .then(() => console.log('Database Synced'))
  .catch(err => console.log(err))
//? Esta configuracion es para habilitar el req.body
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "All ok!" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.get("/ejemplo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res
      .status(200)
      .json({
        message: "Felicidades, tienes credenciales para entrar aqui",
        email: req.user.email,
      });
  }
);

app.listen(8000, () => {
  console.log("Server started at port 8000");
});
