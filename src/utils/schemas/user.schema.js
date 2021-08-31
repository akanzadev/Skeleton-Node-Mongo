const Joi = require('joi')

const userId = Joi.string().regex(/^[0-9a-fA-F]{24}$/)
const userName = Joi.string().alphanum().min(3).max(30)
const userEmail = Joi.string().email()
const userPassword = Joi.string().min(3).max(30)
const userAvatar = Joi.string().uri()
const userRole = Joi.string().valid('ADMIN', 'USER')
const userSkip = Joi.number().integer().min(0)
const userLimit = Joi.number().integer().min(1).max(50)
/* const userImage = Joi.string().uri()
 */
const idUserSchema = Joi.object({
  id: userId.required()
})

const getUsersSchema = Joi.object({
  skip: userSkip,
  limit: userLimit
})

const createUserSchema = Joi.object({
  name: userName.required(),
  password: userPassword.required(),
  email: userEmail.required(),
  role: userRole.required()
})

const updateUserSchema = Joi.object({
  name: userName,
  email: userEmail,
  password: userPassword,
  avatar: userAvatar,
  role: userRole
})

module.exports = {
  createUserSchema,
  idUserSchema,
  updateUserSchema,
  getUsersSchema
}
