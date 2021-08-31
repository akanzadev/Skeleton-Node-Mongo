const boom = require('@hapi/boom')
const User = require('../../user/user.model')
const { decodedJwt } = require('../helpers/jwt')

const validateJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    // validar si hay token
    if (!token) next(boom.unauthorized('No token provided'))
    // Decoded JWT
    const { uid } = await decodedJwt(token)
    // Buscar usuario
    const user = await User.findById(uid)
    // Verificar si usuari existe
    if (!user) next(boom.unauthorized('User not found'))
    // Verificar si usuario esta activo
    if (!user.status) next(boom.unauthorized('User is not active'))
    // Verificar rol
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { validateJwt }
