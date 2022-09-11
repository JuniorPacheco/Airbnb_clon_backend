const router = require("express").Router();

const { register } = require("../users/users.http");
const authServices = require("./auth.http");

router.post("/login", authServices.login);
router.post("/register", register);

exports.router = router;