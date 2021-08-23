const { Router } = require('express')
const validationHandler = require('../utils/middlewares/validationHandler')
const {
  createUserSchema,
  updateUserSchema,
  idSchema,
  getUsersSchema
} = require('../utils/schemas/user.schema')

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
router.delete('/:id', [
  validationHandler(idSchema, 'params')
], deleteUser)

module.exports = router
