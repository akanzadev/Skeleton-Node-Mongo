const { Router } = require('express')
const { authSchema } = require('../utils/schemas/auth.schema')
const validationHandler = require('../utils/middlewares/validationHandler')

const {
  authUser
} = require('./auth.controller')

const router = Router()
router.post('/login', [validationHandler(authSchema, 'body')], authUser)

module.exports = router
