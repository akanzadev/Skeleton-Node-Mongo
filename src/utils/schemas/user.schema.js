const Joi = require('@hapi/Joi')

const userIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/)
const userNameSchema = Joi.string().alphanum().min(3).max(30)
const userEmailSchema = Joi.string().email()
const userPasswordSchema = Joi.string().min(3).max(30)
const userAvatarSchema = Joi.string().uri()
const userRoleSchema = Joi.string().valid('ADMIN', 'USER')
const userSkipSchema = Joi.number().integer().min(0)
const userLimitSchema = Joi.number().integer().min(1).max(50)

const idSchema = Joi.object({
  id: userIdSchema.required()
})

const getUsersSchema = Joi.object({
  skip: userSkipSchema,
  limit: userLimitSchema
})

const createUserSchema = Joi.object({
  name: userNameSchema.required(),
  password: userPasswordSchema.required(),
  email: userEmailSchema.required(),
  role: userRoleSchema.required()
})

const updateUserSchema = Joi.object({
  name: userNameSchema,
  email: userEmailSchema,
  password: userPasswordSchema,
  avatar: userAvatarSchema,
  role: userRoleSchema
})

module.exports = {
  createUserSchema,
  idSchema,
  updateUserSchema,
  getUsersSchema
}
