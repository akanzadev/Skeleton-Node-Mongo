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
  avatar: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: true,
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
  const { __v, password, ...data } = this.toObject()
  const user = { id: data._id, ...data }
  delete user._id
  return user
}

const User = model('User', UserSchema)
module.exports = User
