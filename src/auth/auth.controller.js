const { response, request } = require('express')
const { login, loginGoogle } = require('./auth.service')
const { handleSuccess } = require('../config/response')
const { verifyGoogleToken } = require('../utils/helpers/google-verify')

const authSigInUser = async (req = request, res = response, next) => {
  try {
    const { body } = req
    const credentials = await login(body)
    handleSuccess(res, req, credentials, 'Login ok', 200)
  } catch (error) {
    next(error)
  }
}
const GoogleSigInUser = async (req = request, res = response, next) => {
  try {
    const payload = await verifyGoogleToken(req.body.id_token)
    const user = await loginGoogle(payload)
    handleSuccess(res, req, user, 'Login with google ok', 200)
  } catch (error) {
    next(error)
  }
}
module.exports = {
  authSigInUser, GoogleSigInUser
}
