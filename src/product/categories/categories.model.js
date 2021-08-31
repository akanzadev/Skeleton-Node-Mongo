const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },

  status: {
    type: Boolean,
    default: true,
    required: [true, 'Status is required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Usuario is required']
  }
})

CategorySchema.methods.toJSON = function () {
  const { _id, status, __v, ...category } = this.toObject()
  category.id = _id
  return category
}

const Category = model('Category', CategorySchema)
module.exports = Category
