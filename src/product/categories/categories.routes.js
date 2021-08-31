const { Router } = require('express')
const { validationHandler, validateJwt } = require('../../utils/middlewares')
const {
  createCategorySchema,
  getCategoriesSchema,
  jwtSchema,
  idCategorySchema,
  updateCategorySchema
} = require('../../utils/schemas')
const {
  deleteCategory,
  getCategories,
  getCategory,
  postCategory,
  putCategory
} = require('./categories.controller')

const router = Router()
// Obtener por id
router.get(
  '/:id',
  [validationHandler(idCategorySchema, 'params')],
  getCategory
)
// Otener todas las categorias
router.get(
  '/',
  [validationHandler(getCategoriesSchema, 'query')],
  getCategories
)
// Crear una categoria
router.post(
  '/',
  [
    validationHandler(jwtSchema, 'headers'),
    validateJwt,
    validationHandler(createCategorySchema, 'body')
  ],
  postCategory
)
router.put(
  '/:id',
  [
    validationHandler(jwtSchema, 'headers'),
    validateJwt,
    validationHandler(idCategorySchema, 'params'),
    validationHandler(updateCategorySchema, 'body')
  ],
  putCategory
)
// Eliminar una categoria
router.delete(
  '/:id',
  [
    validationHandler(jwtSchema, 'headers'),
    validateJwt,
    validationHandler(idCategorySchema, 'params')
  ],
  deleteCategory
)

module.exports = router
