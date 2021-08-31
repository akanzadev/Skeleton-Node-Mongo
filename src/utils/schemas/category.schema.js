const Joi = require('joi')

const categoryId = Joi.string().regex(/^[0-9a-fA-F]{24}$/)
const categoryName = Joi.string().min(3).max(30)
const categorySkip = Joi.number().integer().min(0)
const categoryLimit = Joi.number().integer().min(1).max(50)

const idCategorySchema = Joi.object({
  id: categoryId.required()
})

const getCategoriesSchema = Joi.object({
  skip: categorySkip,
  limit: categoryLimit
})

const createCategorySchema = Joi.object({
  name: categoryName.required()
})

const updateCategorySchema = Joi.object({
  name: categoryName.required()
})

module.exports = {
  createCategorySchema,
  idCategorySchema,
  getCategoriesSchema,
  updateCategorySchema
}
