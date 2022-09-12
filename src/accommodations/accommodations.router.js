const router = require('express').Router()

const passport = require('passport')
const { roleHostMiddleware, roleHostOrAdmin } = require('../middleware/roles.middleware')
require('../middleware/auth.middleware')(passport)
const accommodationServices = require('./accommodations.http')

router.route('/')
    .get(accommodationServices.getAll)
    .post(passport.authenticate('jwt',{session: false}), roleHostMiddleware, accommodationServices.create)

router.route('/:id')
    .get(accommodationServices.getById)
    .put(passport.authenticate('jwt',{session: false}), roleHostOrAdmin, accommodationServices.edit)
    .delete(accommodationServices.remove)

module.exports= {
    router
}
