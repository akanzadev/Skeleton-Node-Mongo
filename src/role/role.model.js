const { Schema, model } = require('mongoose')

const RoleSchema = new Schema({
  role: {
    type: String,
    required: [true, 'Role is required']
  }
})

const Role = model('User', RoleSchema)
module.exports = Role
