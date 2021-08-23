const Role = require('./role.model')
const boom = require('@hapi/boom')
const getRole = async (role) => {
  const roleExist = await Role.findOne({ role })
  if (!roleExist) {
    const error = new Error('Role not found')
    throw boom.boomify(error, {
      statusCode: 400
    })
  }
  // Devolver usuario
  return roleExist
}

module.exports = {
  getRole
}
