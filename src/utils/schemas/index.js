const jwtSchema = require('./auth.schema')
const userSchema = require('./user.schema')
const categorySchema = require('./category.schema')
const productSchema = require('./product.schema')
module.exports = {
  ...jwtSchema, ...userSchema, ...categorySchema, ...productSchema
}
