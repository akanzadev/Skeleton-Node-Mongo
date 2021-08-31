const { Router } = require('express')
const { validationHandler, validateJwt } = require('../../utils/middlewares')
const {
  createProductSchema,
  idProductSchema,
  updateProductSchema
} = require('../../utils/schemas')
const {
  postProducts,
  getProducts,
  getProduct,
  deleteProduct,
  putProduct
} = require('./products.controller')

const router = Router()

// Crear un producto
router.post(
  '/',
  [
    validateJwt,
    validationHandler(createProductSchema, 'body')
  ],
  postProducts
)
// Listar products
router.get('/', getProducts)
// Obtener un producto
router.get(
  '/:id',
  [validationHandler(idProductSchema, 'params')],
  getProduct
)
// Eliminar un producto
router.delete(
  '/:id',
  [validateJwt, validationHandler(idProductSchema, 'params')],
  deleteProduct
)
// Actualizar un producto
router.put(
  '/:id',
  [
    validateJwt,
    validationHandler(idProductSchema, 'params'),
    validationHandler(updateProductSchema, 'body')
  ],
  putProduct
)

module.exports = router
