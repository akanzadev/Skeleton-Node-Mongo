const { response, request } = require('express')
const { createProduct, desactivateProduct, findProduct, listProducts, updateProduct } = require('./products.service')
const { handleSuccess } = require('../../config/response')

const getProduct = async (req = request, res = response, next) => {
  try {
    // Obtener id de producto
    const product = await findProduct(req.params.id)
    handleSuccess(res, req, product, 'Product', 200)
  } catch (error) {
    next(error)
  }
}
const getProducts = async (req = request, res = response, next) => {
  try {
    // Obtener queryparams de paginacion
    const products = await listProducts(req.query)
    handleSuccess(res, req, products, 'List of products', 200)
  } catch (error) {
    next(error)
  }
}
const postProducts = async (req = request, res = response, next) => {
  try {
    // informacion del producto
    const product = req.body
    // id de usuario
    const { _id: user } = req.user
    const newProduct = await createProduct({ ...product, user })
    handleSuccess(res, req, newProduct, 'Product created', 201)
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req = request, res = response, next) => {
  try {
    // Obtener id para eliminar producto
    const { params: id } = req
    const productDeleted = await desactivateProduct(id)
    handleSuccess(res, req, productDeleted, 'Product deleted', 200)
  } catch (error) {
    next(error)
  }
}

const putProduct = async (req = request, res = response, next) => {
  try {
    // Obtener id de producto y informacion del producto a actualizar
    const { params: { id }, body: product } = req
    const productUpdated = await updateProduct(id, product)
    handleSuccess(res, req, productUpdated, 'Product updated', 200)
  } catch (error) {
    next(error)
  }
}
module.exports = {
  deleteProduct,
  getProduct,
  getProducts,
  postProducts,
  putProduct
}
