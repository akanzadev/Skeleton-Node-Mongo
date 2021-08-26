const Joi = require('joi')

const userEmailSchema = Joi.string().email()
const userPasswordSchema = Joi.string().min(3).max(30)
const userToken = Joi.string().min(3).max(500)
const googleToken = Joi.string()
const authSchema = Joi.object({
  email: userEmailSchema.required(),
  password: userPasswordSchema.required()
})
const authGoogleSchema = Joi.object({
  id_token: googleToken.required()
})
const jwtSchema = Joi.object({
  authorization: userToken.required()
}).options({ allowUnknown: true })

module.exports = { authSchema, jwtSchema, authGoogleSchema }
