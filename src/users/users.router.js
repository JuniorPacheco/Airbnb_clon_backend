const router = require('express').Router();
const passport = require('passport');
require('../middleware/auth.middleware')(passport);

const { roleAdminMiddleware, roleHostOrAdmin } = require('../middleware/roles.middleware');

const userServices = require('./users.http');
const accommodationsServices = require('../accommodations/accommodations.http');

router.route('/')
    .get(passport.authenticate('jwt',{session: false}), roleAdminMiddleware, userServices.getAll)

router.route('/me')
    .put(passport.authenticate('jwt',{session: false}), userServices.editMyUser)
    .get(passport.authenticate('jwt',{session: false}) ,userServices.getMyUser)
    .delete(passport.authenticate('jwt',{session: false}) ,userServices.removeMyUser)

router.route('/:id')
    .get(passport.authenticate('jwt',{session: false}), roleHostOrAdmin, userServices.getById)
    .delete(passport.authenticate('jwt',{session: false}), roleAdminMiddleware, userServices.remove)
    .put(passport.authenticate('jwt',{session: false}), roleAdminMiddleware, userServices.edit)

router.route('/:id/accommodations')
    .get(passport.authenticate('jwt',{session: false}), roleAdminMiddleware, accommodationsServices.getAllByUserId)

exports.router = router