const router = require('express').Router()

const passport = require('passport')
require('../middleware/auth.middleware')(passport)

const { roleHostOrGuest, roleAdminMiddleware } = require('../middleware/roles.middleware')
const getRoles = require('../middleware/getroles.middleware')
const verifyCancelation = require('../middleware/verifyCancelation.middleware')
const verifyFinished = require('../middleware/verifyFinished.middleware')
const reservationsServices = require('./reservations.http')

router.route('/')
    .get(passport.authenticate('jwt',{session: false}), roleAdminMiddleware, reservationsServices.getAll)

router.route('/:id')
    .get(passport.authenticate('jwt',{session: false}), getRoles, reservationsServices.getById)
    .put(passport.authenticate('jwt',{session: false}), verifyCancelation, verifyFinished, reservationsServices.edit)
    .delete(passport.authenticate('jwt',{session: false}), roleHostOrGuest, verifyCancelation, verifyFinished, reservationsServices.remove)

router.route('/me')
    .get(passport.authenticate('jwt',{session: false}), reservationsServices.getAllMine)

exports.router = router