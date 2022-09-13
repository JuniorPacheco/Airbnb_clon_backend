const router = require('express').Router()

const passport = require('passport')
require('../middleware/auth.middleware')(passport)

const { roleHostOrGuest, roleAdminMiddleware } = require('../middleware/roles.middleware')
const reservationsHttp = require('./reservations.http')

router.route('/')
    .get(passport.authenticate('jwt',{session: false}), roleAdminMiddleware, reservationsHttp.getAll)
    .post(passport.authenticate('jwt',{session: false}), reservationsHttp.create)

router.route('/:id')
    .get(passport.authenticate('jwt',{session: false}), reservationsHttp.getById)
    .put(passport.authenticate('jwt',{session: false}), roleHostOrGuest, reservationsHttp.edit)
    .delete(passport.authenticate('jwt',{session: false}), roleHostOrGuest, reservationsHttp.remove)

router.route('/me')
    .get(passport.authenticate('jwt',{session: false}), reservationsHttp.getAllMine)

exports.router = router