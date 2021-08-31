const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  image: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: true,
    default: 'USER',
    enum: ['ADMIN', 'USER']
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

UserSchema.methods.toJSON = function () {
  const { _id, __v, password, ...usuario } = this.toObject()
  usuario.uid = _id
  return usuario
}

const User = model('User', UserSchema)
module.exports = User
