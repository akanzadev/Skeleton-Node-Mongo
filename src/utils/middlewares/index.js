const validateJwt = require('./validateJwtHandler')
const validateRole = require('./validateRoleHandler')
const validationHandler = require('./validationHandler')
const uploadHandler = require('./uploadImageHandler')
const multerHandler = require('./multerConfigHandler')
module.exports = { ...validateJwt, ...validateRole, ...validationHandler, ...uploadHandler, ...multerHandler }
