const { Router } = require('express')
const { authSchema } = require('../utils/schemas')
const { validationHandler } = require('../utils/middlewares')

const {
  authUser
} = require('./auth.controller')

const router = Router()
router.post('/login', [validationHandler(authSchema, 'body')], authUser)

module.exports = router
