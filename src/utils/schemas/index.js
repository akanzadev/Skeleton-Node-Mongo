const jwtSchema = require('./auth.schema')
const userSchema = require('./user.schema')
const categorySchema = require('./category.schema')
module.exports = {
  ...jwtSchema, ...userSchema, ...categorySchema
}
