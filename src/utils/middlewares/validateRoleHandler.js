const boom = require('@hapi/boom')

const validateRole = (...roles) => {
  return (req, res, next) => {
    const { user } = req
    if (!user) throw boom.unauthorized('Se intenta verificar el role sin verificar el token')
    if (!roles.includes(user.role)) throw boom.unauthorized(`El servicio requiere uno de estos ${roles}`)
    next()
  }
}

module.exports = { validateRole }
