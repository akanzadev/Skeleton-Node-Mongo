const validateJwt = require('./validateJwtHandler')
const validateRole = require('./validateRoleHandler')
const validationHandler = require('./validationHandler')

module.exports = { ...validateJwt, ...validateRole, ...validationHandler }
