const router = require('express').Router();

const passport = require('passport');
const { roleHostOrAdmin, roleHostMiddleware } = require('../middleware/roles.middleware');
require('../middleware/auth.middleware')(passport);

const accommodationServices = require('./accommodations.http');
const reservationServices = require("../reservations/reservations.http");

router.route('/')
    .get(accommodationServices.getAll)

router.route('/me')
    .get(passport.authenticate('jwt',{session: false}), roleHostMiddleware, accommodationServices.getAllMine) 

router.route('/:id')
    .get(accommodationServices.getById)
    .put(passport.authenticate('jwt',{session: false}), roleHostOrAdmin, accommodationServices.edit)
    .delete(passport.authenticate('jwt',{session: false}), roleHostOrAdmin, accommodationServices.remove)

router.route('/:id/make-reservation')
    .post(passport.authenticate('jwt',{session: false}), reservationServices.create)
    
module.exports= {
    router
}
