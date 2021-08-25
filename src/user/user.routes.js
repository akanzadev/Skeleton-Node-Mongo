const { Router } = require('express')
const { validateJwt, validateRole, validationHandler } = require('../utils/middlewares')
const { jwtSchema, createUserSchema, getUsersSchema, updateUserSchema, idSchema } = require('../utils/schemas')

const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  patchUser,
  getUser
} = require('./user.controller')

const router = Router()
router.get('/:id', [validationHandler(createUserSchema, 'params')], getUser)
router.get('/', [validationHandler(getUsersSchema, 'query')], getUsers)
router.post('/', [validationHandler(createUserSchema, 'body')], postUser)
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
