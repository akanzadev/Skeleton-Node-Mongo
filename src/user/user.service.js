const User = require('./user.model')
const bcryptjs = require('bcryptjs')
const boom = require('@hapi/boom')
const createUser = async (user) => {
  // Validar email
  const emailExist = await User.findOne({ email: user.email })
  if (emailExist) {
    const error = new Error('Email already registered')
    throw boom.boomify(error, {
      statusCode: 400
    })
  }
  // Crear usuario con modelo
  const newUser = new User(user)
  // Encriptar contraseña
  const salt = bcryptjs.genSaltSync(10)
  newUser.password = bcryptjs.hashSync(user.password, salt)
  // Guardar usuario
  await newUser.save()
  // Devolver usuario
  return newUser
}

const updateUser = async ({ id }, user, file) => {
  // Validar email
  const emailExist = await User.findOne({ email: user.email })
  if (emailExist && emailExist._id !== id) {
    const error = new Error('Email already registered')
    throw boom.boomify(error, {
      statusCode: 400
    })
  }
  // Renombra imagen
  // Actualizar usuario
  const updatedUser = await User.findByIdAndUpdate(id, user, {
    new: true
  })
  if (!updatedUser) {
    const error = new Error('User not found')
    throw boom.boomify(error, {
      statusCode: 404
    })
  }
  // Devolver usuario
  return updatedUser
}

const findUser = async ({ id }) => {
  // Obtener usuarios
  const user = await User.findById(id)
  if (!user) {
    const error = new Error('User not found')
    throw boom.boomify(error, {
      statusCode: 404
    })
  }
  // Validar estado
  if (!user.status) {
    const error = new Error('User not active')
    throw boom.boomify(error, {
      statusCode: 400
    })
  }
  // Devolver usuarios
  return user
}

const listUsers = async ({ skip = 0, limit = 2 }) => {
  // Obtener usuarios
  const users = await User.find({ status: true }).skip(Number(skip)).limit(Number(limit))
  const countDocument = await User.countDocuments({ status: true })
  if (!users) {
    const error = new Error('Users not found')
    throw boom.boomify(error, {
      statusCode: 404
    })
  }
  // Devolver usuarios
  return { docs: countDocument, users }
}

const desactivateUser = async ({ id }) => {
  // Eliminar usuario
  const deletedUser = await User.findByIdAndUpdate(id, { status: false }, {
    new: true
  })
  if (!deletedUser) {
    const error = new Error('User not found')
    throw boom.boomify(error, {
      statusCode: 404
    })
  }
  // Devolver usuario
  return deletedUser
}

module.exports = {
  createUser,
  updateUser,
  listUsers,
  desactivateUser,
  findUser
}
