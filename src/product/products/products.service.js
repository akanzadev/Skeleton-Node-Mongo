const boom = require('@hapi/boom')
const { findCategory } = require('../categories/categories.service')
const Product = require('./products.model')
const createProduct = async (product) => {
  // Validar producto
  const productExist = await Product.findOne({ name: product.name })
  if (productExist) {
    const error = new Error('Product already registered')
    throw boom.boomify(error, {
      statusCode: 400
    })
  }
  // Validar categoria
  await findCategory(product.category)
  // Crear producto con modelo
  const newProduct = new Product(product)
  // Guardar producto
  await newProduct.save()
  // Devolver producto
  return newProduct
}

const updateProduct = async (id, product) => {
  // Validar producto
  const productExist = await Product.findOne({ name: product.name })
  if (productExist && productExist._id !== id) {
    const error = new Error('Product already registered')
    throw boom.boomify(error, {
      statusCode: 400
    })
  }
  // Validar si esta desactivado
  const productDesactivate = await Product.findOne({ _id: id, status: false })
  if (productDesactivate) {
    const error = new Error('Product already desactivated')
    throw boom.boomify(error, {
      statusCode: 400
    })
  }

  // Actualizar producto
  const updatedProduct = await Product.findByIdAndUpdate(id, product, {
    new: true
  })
  if (!updatedProduct) {
    const error = new Error('Product not found')
    throw boom.boomify(error, {
      statusCode: 404
    })
  }
  // Devolver productos
  return updatedProduct
}

const findProduct = async (id) => {
  // Obtener producto
  const product = await Product.findOne({ _id: id, status: true })
  if (!product) {
    const error = new Error('Product not found')
    throw boom.boomify(error, {
      statusCode: 404
    })
  }
  // Devolver producto
  return product
}

const listProducts = async ({ skip = 0, limit = 5 }) => {
  // Obtener productos
  const products = await Product.find({ status: true })
    .skip(Number(skip))
    .limit(Number(limit))
  const countDocument = await Product.countDocuments({ status: true })
  if (!products) {
    const error = new Error('Products not found')
    throw boom.boomify(error, {
      statusCode: 404
    })
  }
  // Devolver productos
  return { docs: countDocument, products }
}

const desactivateProduct = async ({ id }) => {
  // Eliminar producto
  const deletedProduct = await Product.findByIdAndUpdate(
    id,
    { status: false },
    {
      new: true
    }
  )
  if (!deletedProduct) {
    const error = new Error('Product not found')
    throw boom.boomify(error, {
      statusCode: 404
    })
  }
  // Devolver producto
  return deletedProduct
}

module.exports = {
  createProduct,
  updateProduct,
  listProducts,
  desactivateProduct,
  findProduct
}
