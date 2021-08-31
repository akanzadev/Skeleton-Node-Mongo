const { Router } = require('express')
const { validationHandler } = require('../utils/middlewares/validationHandler')
const { findTermSchema } = require('../utils/schemas/search.schema')
const { findTerm } = require('./search.controller')

const router = Router()

router.get(
  '/:collection/:term',
  [validationHandler(findTermSchema, 'params')],
  findTerm
)
module.exports = router
