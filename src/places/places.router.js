const router = require('express').Router()

const passport = require('passport')
require('../middleware/auth.middleware')(passport)

const accommodationsServices = require("../accommodations/accommodations.http")
const { roleHostMiddleware } = require('../middleware/roles.middleware')

router.route('/:id/create-accommodation')
    .post(passport.authenticate('jwt',{session: false}), roleHostMiddleware, accommodationsServices.create)

exports.router = router