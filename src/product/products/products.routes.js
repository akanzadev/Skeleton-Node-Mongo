const { Router } = require('express')
const { createCategorySchema, getCategoriesSchema, getCategorySchema } = require('../../utils/schemas')
const { validateJwt, validateRole, validationHandler } = require('../utils/middlewares')

const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  patchUser,
  getUser
} = require('./user.controller')

const router = Router()
router.get('/:id', [validationHandler(getCategorySchema, 'params')], getUser)
router.get('/', [validationHandler(getCategoriesSchema, 'query')], getUsers)
router.post('/', [validationHandler(createCategorySchema, 'body')], postUser)
router.put(
  '/:id',
  [
    validationHandler(idSchema, 'params'),
    validationHandler(updateUserSchema, 'body')
  ],
  putUser
)
router.patch('/:id', patchUser)
router.delete('/:id', [validationHandler(jwtSchema, 'headers'),
  validationHandler(idSchema, 'params'),
  validateJwt,
  validateRole('USER', 'ADMIN')
], deleteUser)

module.exports = router
