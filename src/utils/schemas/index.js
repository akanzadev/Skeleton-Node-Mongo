const jwtSchema = require('./auth.schema')
const userSchema = require('./user.schema')

module.exports = {
  ...jwtSchema, ...userSchema
}
