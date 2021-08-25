const boom = require('@hapi/boom')
const User = require('../../user/user.model')
const { decodedJwt } = require('../helpers/jwt')

const validateJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    // Decoded JWT
    const { uid } = await decodedJwt(token)
    // Buscar usuario
    const user = await User.findById(uid)
    // Verificar si usuari existe
    if (!user) throw boom.unauthorized('Usuario no encontrado')
    // Verificar si usuario esta activo
    if (!user.status) throw boom.unauthorized('Usuario no activo')
    // Verificar rol
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { validateJwt }
