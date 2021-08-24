const Joi = require('@hapi/Joi')

const userEmailSchema = Joi.string().email()
const userPasswordSchema = Joi.string().min(3).max(30)

const authSchema = Joi.object({
  email: userEmailSchema.required(),
  password: userPasswordSchema.required()
})

module.exports = { authSchema }
