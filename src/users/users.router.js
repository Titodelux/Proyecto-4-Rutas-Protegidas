const router = require('express').Router()
const { validatedPassport } = require('../middleware/auth.middleware')
const userServices = require('./users.services')

router.route('/')
    .get(userServices.getAllUsers) //? /api/v1/users
    .post(userServices.postUser) //? /api/v1/users

router.route('/:id')
    .get(userServices.getUserById) //? /api/v1/users/:id
    .patch(validatedPassport.authenticate('jwt', {session: false}), userServices.patchUser) //? /api/v1/users/:id
    .delete(validatedPassport.authenticate('jwt', {session: false}), userServices.deleteUser) //? /api/v1/users/:id

module.exports = router