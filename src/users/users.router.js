const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole.middleware')
require('../middleware/auth.middleware')(passport)

const userServices = require('./users.http')

router.route('/')
    .get(userServices.getAll)

router.route('/me')
    .put(passport.authenticate('jwt',{session: false}), userServices.editMyUser)
    .get(passport.authenticate('jwt',{session: false}) ,userServices.getMyUser)
    .delete(passport.authenticate('jwt',{session: false}) ,userServices.removeMyUser)

router.route('/:id')
    .get(passport.authenticate('jwt',{session: false}), roleAdminMiddleware, userServices.getById)
    .delete(passport.authenticate('jwt',{session: false}), roleAdminMiddleware, userServices.remove)
    .put(passport.authenticate('jwt',{session: false}), roleAdminMiddleware, userServices.edit)


exports.router = router