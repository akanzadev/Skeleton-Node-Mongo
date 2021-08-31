const { response, request } = require('express')
const { createUser, updateUser, listUsers, desactivateUser, findUser } = require('./user.service')
const { handleSuccess } = require('../config/response')

const getUser = async (req = request, res = response, next) => {
  try {
    const { params: id } = req
    const user = await findUser(id)
    handleSuccess(res, req, user, 'User', 200)
  } catch (error) {
    next(error)
  }
}
const getUsers = async (req = request, res = response, next) => {
  try {
    const users = await listUsers(req.query)
    handleSuccess(res, req, users, 'List of Users', 200)
  } catch (error) {
    next(error)
  }
}
const postUser = async (req = request, res = response, next) => {
  try {
    const { body } = req
    const newUser = await createUser(body)
    handleSuccess(res, req, newUser, 'User created', 201)
  } catch (error) {
    next(error)
  }
}
const putUser = async (req = request, res = response, next) => {
  try {
    const { params: id, body } = req
    const userUpdated = await updateUser(id, body)
    handleSuccess(res, req, userUpdated, 'User updated', 200)
  } catch (error) {
    next(error)
  }
}
const patchUser = (req = request, res = response, next) => {
  const auth = req.headers.authorization
  res.json({
    ok: true,
    message: 'patchUser',
    auth
  })
}
const deleteUser = async (req = request, res = response, next) => {
  try {
    const { params: id } = req
    const userDeleted = await desactivateUser(id)
    handleSuccess(res, req, userDeleted, 'User deleted', 200)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUser,
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser
}
