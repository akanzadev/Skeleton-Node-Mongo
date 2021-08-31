const Joi = require('joi')

const searchCollection = Joi.string().valid('users', 'posts', 'comments')
const searchTerm = Joi.string()

const findTermSchema = Joi.object({
  collection: searchCollection.required(),
  term: searchTerm.required()
})

module.exports = {
  findTermSchema
}
