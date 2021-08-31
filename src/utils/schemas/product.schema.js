const Joi = require('joi')

const productId = Joi.string().regex(/^[0-9a-fA-F]{24}$/)
const productName = Joi.string().min(3).max(30)
const productPrice = Joi.number().min(0)
const productDescription = Joi.string().min(3).max(500)
const productAvalible = Joi.boolean()
const productSkip = Joi.number().integer().min(0)
const productLimit = Joi.number().integer().min(1).max(50)
const productIdCategory = Joi.string().regex(/^[0-9a-fA-F]{24}$/)

const idProductSchema = Joi.object({
  id: productId.required()
})

const getCategoriesSchema = Joi.object({
  skip: productSkip,
  limit: productLimit
})

const createProductSchema = Joi.object({
  avalible: productAvalible,
  category: productIdCategory.required(),
  description: productDescription,
  name: productName.required(),
  price: productPrice
})

const updateProductSchema = Joi.object({
  name: productName,
  price: productPrice,
  description: productDescription,
  avalible: productAvalible,
  category: productIdCategory
})

module.exports = {
  createProductSchema,
  getCategoriesSchema,
  idProductSchema,
  updateProductSchema
}
