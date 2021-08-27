const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },

  status: {
    type: Boolean,
    default: true,
    required: [true, 'Status is required']
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Usuario is required']
  }

})

CategorySchema.methods.toJSON = function () {
  const { _id, __v, ...category } = this.toObject()
  category.uid = _id
  console.log(category)
  return category
}

const Category = model('Category', CategorySchema)
module.exports = Category
