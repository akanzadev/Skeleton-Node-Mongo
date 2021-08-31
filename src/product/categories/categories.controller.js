const { response, request } = require('express')
const { createCategory, findCategory, desactivateCategory, listCategories, updateCategory } = require('./categories.service')
const { handleSuccess } = require('../../config/response')

const getCategory = async (req = request, res = response, next) => {
  try {
    // Obtener id de categoria
    const category = await findCategory(req.params.id)
    handleSuccess(res, req, category, 'Category', 200)
  } catch (error) {
    next(error)
  }
}
const getCategories = async (req = request, res = response, next) => {
  try {
    // Obtener queryparams de paginacion
    const categories = await listCategories(req.query)
    handleSuccess(res, req, categories, 'List of categories', 200)
  } catch (error) {
    next(error)
  }
}
const postCategory = async (req = request, res = response, next) => {
  try {
    const { name } = req.body
    const { _id: user } = req.user
    const newCategory = await createCategory({ name, user })
    handleSuccess(res, req, newCategory, 'Category created', 201)
  } catch (error) {
    next(error)
  }
}
const putCategory = async (req = request, res = response, next) => {
  try {
    const { params: { id }, body: category } = req
    const categoryUpdated = await updateCategory(id, category)
    handleSuccess(res, req, categoryUpdated, 'Category updated', 200)
  } catch (error) {
    next(error)
  }
}
const deleteCategory = async (req = request, res = response, next) => {
  try {
    const { params: id } = req
    const categoryDeleted = await desactivateCategory(id)
    handleSuccess(res, req, categoryDeleted, 'Category deleted', 200)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCategory,
  getCategories,
  postCategory,
  putCategory,
  deleteCategory
}
