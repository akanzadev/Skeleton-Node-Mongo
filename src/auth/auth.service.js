const bcryptjs = require('bcryptjs')
const boom = require('@hapi/boom')
const User = require('../user/user.model')
const { generatedJwt } = require('../utils/helpers/jwt')
const { createUser } = require('../user/user.service')

const login = async ({ email, password }) => {
  // Validar email
  const user = await User.findOne({ email, status: true })
  if (!user) {
    const error = new Error('Email or password incorrects')
    throw boom.boomify(error, {
      statusCode: 400
    })
  }
  // Validar password
  const isValidPassword = bcryptjs.compareSync(password, user.password)
  if (!isValidPassword) {
    const error = new Error('Email or password incorrects')
    throw boom.boomify(error, {
      statusCode: 400
    })
  }
  // Generar token
  const token = await generatedJwt(user._id)
  return { user, token }
}

const loginGoogle = async ({ email, avatar, name }) => {
  // Validar email
  const userData = { email, avatar, name, password: ':P', google: true }
  // Validar email
  const user = await User.findOne({ email, status: true })
  if (!user) {
    // Crear usuario
    const newUser = await createUser(userData)
    const token = await generatedJwt(newUser._id)
    return { user: newUser, token }
  } else {
    // Generar token
    const token = await generatedJwt(user._id)
    return { user, token }
  }
}

module.exports = {
  login, loginGoogle
}
