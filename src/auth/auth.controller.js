const { response, request } = require('express')
const { login } = require('./auth.service')
const { handleSuccess } = require('../config/response')

const authUser = async (req = request, res = response, next) => {
  try {
    const { body } = req
    const credentials = await login(body)
    handleSuccess(res, req, credentials, 'Login ok', 200)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  authUser
}
