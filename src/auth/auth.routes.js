const { Router } = require('express')
const { authSchema, authGoogleSchema } = require('../utils/schemas')
const { validationHandler } = require('../utils/middlewares')

const {
  authSigInUser, GoogleSigInUser
} = require('./auth.controller')

const router = Router()
router.post('/login', [validationHandler(authSchema, 'body')], authSigInUser)
router.post('/google', [validationHandler(authGoogleSchema, 'body')], GoogleSigInUser)
module.exports = router
