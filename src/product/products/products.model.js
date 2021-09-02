const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
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
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  description: {
    type: String
  },
  avalible: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: 'https://res.cloudinary.com/akanza/image/upload/v1630443100/rest-node-server/defaults/no-image_hxuirf.jpg'
  }
})

ProductSchema.methods.toJSON = function () {
  const { _id, status, __v, ...product } = this.toObject()
  product.id = _id
  return product
}

const Product = model('Product', ProductSchema)
module.exports = Product
