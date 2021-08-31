const { Router } = require('express')
const {
  validateJwt,
  validateRole,
  validationHandler,
  uploadHandler,
  uploadImageHandler
} = require('../utils/middlewares')
const {
  jwtSchema,
  createUserSchema,
  getUsersSchema,
  updateUserSchema,
  idUserSchema
} = require('../utils/schemas')

const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  patchUser,
  getUser
} = require('./user.controller')

const router = Router()
router.get('/:id', [validationHandler(idUserSchema, 'params')], getUser)
router.get('/', [validationHandler(getUsersSchema, 'query')], getUsers)
router.post('/', [validationHandler(createUserSchema, 'body')], postUser)
router.put(
  '/:id',
  [
    validationHandler(idUserSchema, 'params'),
    validationHandler(updateUserSchema, 'body'),
    uploadHandler,
    uploadImageHandler
  ],
  putUser
)
router.patch('/:id', patchUser)
router.delete(
  '/:id',
  [
    validationHandler(jwtSchema, 'headers'),
    validationHandler(idUserSchema, 'params'),
    validateJwt,
    validateRole('USER', 'ADMIN')
  ],
  deleteUser
)

module.exports = router
